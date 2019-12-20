---
layout: post
title: "Visualizing CFD data using plotly"
author: Ben Brelje
header_image: "https://drive.google.com/uc?id=1cUx8mwn1UpXDIOiLc6lGXJuHS9jIfZ_X"
tags: [visualization, plotly, python, javascript, code, cfd]
categories: [optimization, code]
permalink: /blog/visualizing-cfd-data-plotly/
---

Computational fluid dynamics (CFD) is an indispensable tool in aerospace engineering.
These expensive simulations produce a large amount of three-dimensional flow data, and in order to gain understanding from the results we employ interactive visualization.
We generally use purpose-built desktop applications such as Tecplot or Ensight to do this.
However, the software is expensive and this makes it difficult to share results (other than in simple 2D renderings).
In this post, I will demonstrate how to create web-based, interactive, 3D visualizations of surface pressure data using a free and open-source software stack.

<!--more-->
Check out this example result from one of my earlier research papers! (*[Flexible Formulation of Spatial Integration Constraints in Aerodynamic Shape Optimization
](https://arc.aiaa.org/doi/abs/10.2514/6.2019-2355)*)

<button class="btn btn-lg btn-hidden-viz center-block"
data-plotly-src="/assets/viz/cfdexample.js"
data-plotly-uid="d58f9b77-df41-4618-b6d2-baa7fb02b0a6"
data-height="100%"
data-width="100%">
Click to load
</button>

### Intro to Plotly
I'm very impressed with the [plotly](https://plot.ly/python/) graphing library for Python.
Previously, I've mostly used the matplotlib package for static visualization, and [bokeh](https://docs.bokeh.org/en/latest/index.html) for interactive charts.
In my view, plotly is now the best available free tool for creating interactive charts in Python.

The **Plotly Express** API makes it trivially easy to create and animate simple charts (like scatters and bars).
If you need more detailed control over your figures, there is a lower-level *graph object* API which is what we will be using today.

To install Plotly, I recommend starting from the [Anaconda](https://www.anaconda.com/distribution/) Python 3 distribution.
Once you have a working Anaconda installation, from your command line, type `conda install plotly` and you should be all set.
Check out the examples and tutorials available on the [plotly Python reference page](https://plot.ly/python/).

We will be using the `Mesh3d` graph object today.
To familiarize yourself, check out the [Mesh3d examples](https://plot.ly/python/3d-mesh/) page.
The `Mesh3d` trace takes a triangulated surface and renders it in 3D, complete with lighting effects and shading.
I'll briefly cover the format plotly expects to see.

The `Mesh3d` constructor takes several arguments, including the following geometry data:
- **x, y, z** - Lists of coordinates of the vertices of your surface (all $$N_v$$ by $$1$$ numpy arrays, where $$N_v$$ is the number of vertices)
- **intensity** - The quantity to plot at each vertex point using a color scale. For example, $$C_p$$. It should be the same dimensions as x, y, z since each value corresponds to a point, not a face.
- **i, j, k** - Lists of vertex indices which comprise the triangles of your surface (all $$N_t$$ by $$1$$ numpy integer arrays, where $$N_t$$ is the number of triangles). The maximum value of the entries of i, j, k should be $$N_v$$.

Alternatively, you can provide a point cloud (x, y, z only) and plotly can try to construct a Delaunay triangulation of the object, and the plotly `Mesh3d` example page provides an example of this. However, I don't recommend this approach if you have CFD data since you already know the structure of the mesh.

### Exporting CFD Data from Tecplot
Our lab's workflow generates surface pressure distributions as .cgns files which we postprocess in [Tecplot 360](https://www.tecplot.com/products/tecplot-360/).
It is highly capable software, but it's also very expensive.
We would like to be able to show interactive, volume-rendered CFD data to the general public without the need for a local Tecplot installation.

1. Open your surface pressure distribution file in Tecplot and ensure the data field you want to plot is available.
In this case, we'll be plotting surface pressure coefficient, $$C_p$$.
2. Create a new variable by selecting `Data-Alter-Specify Equations`. In the pop-up window, input `{p3D}={myvarname}` where `myvarname` is the parameter you want to plot. Select `New var location` to be `Node`. Then click `Compute`.
3. Export the data by selecting `File-Write Data`. In the pop-up window, choose a file name, keeping the `.dat` file extension and click `Save`. In the next dialog, select `X`, `Y`, `Z`, and `p3d` in the `Variable(s)` section (*in that order*). Choose the `Zone(s)` you want to plot (one or more is OK). Choose `point` for the format (*important*).

You should see a four-column output format like this:
![](https://drive.google.com/uc?id=1KtzUbYC7BfM5Q_hGYA7dtuJNhgH4vo01
){: .img-responsive .center-block style="width: 80%"}

### Converting Tecplot data into Plotly's format
If you have **structured** CFD data exported from Tecplot in the process described above, the following conversion process applies to you.
You can tell if your data is structured because the header of your `.dat` file will read something like this:

     I=7, J=7, K=1, ZONETYPE=Ordered

If you have **unstructured** data you can use this script as inspiration but you'll have to write your own parser.

I wrote a Python script to convert a structured Tecplot `.dat` file into the x, y, z, i, j, k, intensity format.
The main challenge is that structured surface mesh data usually consists of quadrilaterals, whereas plotly wants triangles.
Therefore we have to triangulate each quad, which is trivial (you just bisect it corner to corner).
I ensured that the triangle normal vectors are pointing in a consistent direction which helps plotly render correctly.
Note that Tecplot saves its output so that i changes fastest, then j, then k (though for surface data k should always be 1).

{% highlight python %}
import sys
import numpy as np
import re

def parse_tecplot_structured(filename):
    f=open(filename,'r')
    lines=f.readlines()
    f.close()

    x = []
    y = []
    z = []
    p = []
    vert1 = []
    vert2 = []
    vert3 = []
    n_prev_tris = 0
    delimiters = " ", "=", ","
    regexPattern = '|'.join(map(re.escape, delimiters))
    first_zone = True
    for line in lines:
        # skip until "zone_t"
        try:
            vals = line.split()
            x.append(float(vals[0]))
            y.append(float(vals[1]))
            z.append(float(vals[2]))
            p.append(float(vals[3]))
            tri_count += 1
            if new_zone:
                raise ValueError('No new ijk indices parsed for this zone')
        except:
            if "ZONE T" in line:
                # new zone.
                if not first_zone:
                    n_prev_tris += ni*nj
                    if tri_count != ni*nj:
                        raise ValueError('Not enough vertices parsed')
                new_zone = True
                first_zone = False
                tri_count = 0
            elif "I=" in line:
                nijk = [int(s) for s in re.split(regexPattern, line) if s.isdigit()]
                ni = nijk[0]
                nj = nijk[1]
                print('Zone: ni='+str(ni)+' nj='+str(nj))
                new_zone = False
                for j in range(nj-1):
                    joffset = j*ni+n_prev_tris
                    for i in range(ni-1):
                        vert1.append(i+joffset)
                        vert3.append(i+1+joffset)
                        vert2.append(i+ni+joffset)
                        vert1.append(i+1+joffset)
                        vert2.append(i+ni+joffset)
                        vert3.append(i+ni+1+joffset)

    x = np.array(x)
    y = np.array(y)
    z = np.array(z)
    p = np.array(p)
    vert1 = np.array(vert1)
    vert2 = np.array(vert2)
    vert3 = np.array(vert3)

    return x, y, z, p, vert1, vert2, vert3
{% endhighlight %}

### Generating the plotly visualization
Now that we have CFD data in the proper format, we can plot it easily using plotly.
We use the `plotly.io` API to generate output in HTML format.
The bulk of the chart data is actually stored as Javascript.
The plotly rendering engine itself is loaded as a huge Javascript file called `plotly.js`.
We use the option `include_plotlyjs='cdn'`, which will automatically download `plotly.js` from the internet instead of bundling it with the HTML file (which greatly increases its size).

{% highlight python %}
import sys
import numpy as np
import re
import plotly.graph_objects as go
import plotly.io as pio
def generate_plotly_cfd(filename):
    # parse the tecplot structured data file into plotly format
    x, y, z, p, vert1, vert2, vert3 = parse_tecplot_structured(filename)

    fig = go.Figure(data=[
        go.Mesh3d(
            x=x,
            y=y,
            z=z,
            colorbar_title='Cp',
            colorscale='viridis',
            # Intensity of each vertex, which will be interpolated and color-coded
            intensity=p,
            # i, j and k give the vertices of triangles
            # here we represent the 4 triangles of the tetrahedron surface
            i=vert1,
            j=vert2,
            k=vert3,
            #flatshading=True,
            #lighting=dict(diffuse=0.9),
            name='y',
            showscale=True
        )
    ])
    fig.update_layout(scene_aspectmode='data')

    fig.show()
    pio.write_html(fig, 'cfdoutput.html', include_plotlyjs='cdn', include_mathjax=False, auto_open=True)
{% endhighlight %}

If everything went well, we should have a working visualization open in the browser!
You can now redistribute this HTML file to anybody with a modern browser and they should be able to open it.

![](https://drive.google.com/uc?id=1cUx8mwn1UpXDIOiLc6lGXJuHS9jIfZ_X
){: .img-responsive .center-block style="width: 80%"}

### Embedding CFD results in a web page
There is an easy way to embed plotly results, and an elegant way.
The easy way is to simply use an `iframe` element to directly embed the plotly HTML file in your site.
However, since the `plotly.js` file is so huge (3 MB), this will slow down your page load.

A better way is to load the visualization on demand!
This requires a little bit of web frontend work using Javascript and CSS.
We want to create a button which, once clicked, loads the huge plotly Javascript files and then creates space for the visualization.

First, open the HTML file from the previous step.
You should see a line similar to this:

    <div id="d58f9b77-df41-4618-b6d2-baa7fb02b0a6" class="plotly-graph-div" style="height:100%; width:100%;"></div>

The unique identifier, height, and width information will come in handy later.
Below this line you should see a big `<script>` element with your plot data.
Save the interior of the `<script>` element (without the actual `<script>` tags) as a separate Javascript file with a `.js` extension.
Make sure your site can serve it as a static file.

Next, we create a button in our web page and tag it with some CSS classes to style it.
I use Bootstrap 3 so the `btn` and `btn-lg` classes apply colors and some effects.

    <button class="btn btn-lg">Click to load</button>

Now we need to add some HTML5 data to the button so we know some information about the visualization for this interaction.
Let's add the following attributes:
- **data-plotly-uid** - Plotly assigns a unique identifier to each visualization generated using `plotly.io`
- **data-plotly-src** - Path to the Javascript file that holds the visualization data. This is the contents of the HTML file from the previous step (enclosed by `<script>` tags).
- **data-height** - Height of the visualization (can be found in the HTML file). Expressed like `900px` or `100%`
- **data-width** - Width of the visualization

Let's also tag it with a new CSS class called `btn-hidden-viz`.
The HTML code for our button now looks like this:

    <button class="btn btn-lg btn-hidden-viz"
    data-plotly-src="/assets/viz/cfdexample.js"
    data-plotly-uid="d58f9b77-df41-4618-b6d2-baa7fb02b0a6"
    data-height="100%"
    data-width="100%">
    Click to load
    </button>

Next, I want to create a click handler which loads `plotly.js` from a CDN, then loads my visualization, and finally inserts it into the page and disappears.
I use jQuery's click handler to apply the interaction to all buttons with the `btn-hidden-viz` class.
I use jQuery `ajax`  to ensure that the `plotly.js` file is loaded before the visualization is opened.
I also set a 10 second timeout in case the user is on a slow connection or has lost connection to the CDN.

This snippet does the trick.
You'll want to add it to your site's Javascript preload file.

{% highlight javascript %}
//Function to load plotly.js on demand and show a visualization
$(function(){
    $('.btn-hidden-viz').on('click', function() {
    var thebutton = $(this)
    var plotlyuid = $(this).data('plotlyUid');
    var plotlysrc = $(this).data('plotlySrc');
    var spinnerid = plotlyuid.concat('-spinner');
    var height = $(this).data('height');
    var width = $(this).data('width');
    $('<div id="'.concat(plotlyuid,'" class="plotly-graph-div"></div>')).insertBefore(thebutton);
    window.PlotlyConfig = {MathJaxConfig: 'local'};
    $.ajax({
      timeout: 10000,
      url: 'https://cdn.plot.ly/plotly-latest.min.js',
      dataType: 'script',
      cache: true, // or get new, fresh copy on every page load
      beforeSend: function () {
          console.log('here');
          thebutton.html('<span id=\"'.concat(spinnerid,'\"></span> Loading'));
          $('#'.concat(spinnerid)).attr("class","glyphicon glyphicon-refresh glyphicon-refresh-animate");
        },
      success: function() {
        // Callback
        window.PLOTLYENV=window.PLOTLYENV || {};
        $.ajax({
          url: plotlysrc,
          dataType: 'script',
          timeout: 5000,
          cache: true, // or get new, fresh copy on every page load
          success: function() {
            // Callback
            $("#".concat(plotlyuid)).attr("style","height:".concat(height,"; width:",width,";"));
            thebutton.remove();
          },
          error: function() {
              thebutton.html("error loading visualization");
          }
        });
      },
      error: function() {
         thebutton.html("error loading visualization");
      }
    });
    });})
{% endhighlight %}

Finally, let's add a spinner effect while the visualization is loading.
I did this by adding a `<span>` element with these classes to the button during the `ajax` calls:

    glyphicon glyphicon-refresh glyphicon-refresh-animate

We include the following snippet (which I swiped from a CSS showcase somewhere) in our site's CSS to get the animation to work properly:

{% highlight css %}
 .glyphicon-refresh-animate {
    -animation: spin .7s infinite linear;
    -webkit-animation: spin2 .7s infinite linear;
}

@-webkit-keyframes spin2 {
    from { -webkit-transform: rotate(0deg);}
    to { -webkit-transform: rotate(360deg);}
}

@keyframes spin {
    from { transform: scale(1) rotate(0deg);}
    to { transform: scale(1) rotate(360deg);}
}
{% endhighlight %}

And there you have it!
The final product looks like this:

<button class="btn btn-lg btn-hidden-viz"
data-plotly-src="/assets/viz/cfdexample.js"
data-plotly-uid="d58f9b77-df41-4618-b6d2-baa7fb02b0a6"
data-height="100%"
data-width="100%">
Click to load
</button>

### Summary
Plotly is the best way I have found so far to render CFD results interactively on the internet for free.
You can find the code I used for this example and a sample Tecplot `.dat` file [here](https://gist.github.com/bbrelje/91c8acdfc6c852fd979d24b586e68357).