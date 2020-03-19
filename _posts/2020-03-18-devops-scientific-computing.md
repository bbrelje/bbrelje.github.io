---
layout: post
title: "DevOps for Research and High-Performance Computing"
author: Ben Brelje
header_image: "https://drive.google.com/uc?id=110c9D0UgeAs5S4-zAngHgeLmnoxMI63x"
tags: [HPC, docker, computing, testing, deployment, CI/CD]
categories: [optimization,computing]
permalink: /blog/devops-scientific-computing/
---

Software produced in research has a bad rap.
"Researchy" codes might have very powerful capabilities, but be plagued by the following issues:
- Buggy (untrusted results)
- Poorly-documented
- Hard to build or run on your computer
- Fragile to code changes or environment changes
- Slow or non-existent updates and patches
- Insecure

Part of this is because researchers are usually **scientists first and coders second** (or fifth...).
There is an incentive to make progress quickly, finish the paper, and then move on to the next, novel topic.
The net result is a huge supply of software that consumed thousands of hours but never gets used again.
You think social science has a replication crisis? 
Good luck trying to replicate a paper involving most research codes.

Another problem is that academic labs have a lot of turnover.
Students are constanly entering the lab without much software development experience, then graduating and leaving a few years later.
This leads to a loss of institutional memory about why parts of the codebase are the way they are.

You know who else deals with similar issues?
**The entire tech industry.**
Various software engineering methodologies (agile, spiral, extreme programming, etc.) have been proposed over the years to solve these issues.
It's an industry for authors and consultants, but there are some valuable practices to be found here as well.
<!--more-->

A paradigm that has been particularly influential in the past few years is [**DevOps**](https://aws.amazon.com/devops/what-is-devops/).
It can be a catch-all term, but I think of it as a set of best-practices which attempt to bridge the chasm between software development and production use of the software.
Most people would associate these practices with DevOps:

- **Version Control** - All code is kept under version control
- **Continuous Integration** - Frequently merging code changes to a central repository (e.g. daily)
- **Automated Testing** - Testing code changes regularly in order to find bugs early
- **Continuous Delivery** - Automatically preparing production-ready builds of the code once tests pass
- **Infrastructure as Code** - Rigorously defining (and source-controlling) the conditions under which the software will run in production, including external dependencies and OS settings

As researchers, "production" looks very different for us than it does for Facebook or Google.
We are not serving billions of users. 
However, when we publish results based on software, we have an obligation to make sure that the code is of high quality.
We also want to minimize the pain and suffering associated with software development, maximizing the ratio of time spent doing science / time spent dealing with IT issues. 
Adopting DevOps practices could help do that, especially in large labs.

Why can't we just use tech's DevOps best practices as-is?
There are two main reasons.
First, **research often depends on high-performance computing** (HPC). 
Supercomputing clusters are unique resources, and off-the-shelf DevOps tools don't work for them.
Second, **research codes often use exotic dependencies** that most of the tech industry isn't focused on.
For example, massively parallel applications almost invariably rely on MPI libraries to handle communication. 
Existing DevOps tools aren't generally set up to serve these dependencies out of the box.

Since most of the literature on source control and CI is applicable to research, I will focus on the aspects that require special accomodations: infrastructure, testing, and deployment.

## Docker for Defining Environments

Managing the *environment* into which a code is installed is a major challenge in research computing.
Scientific computing applications often depend on specific versions of other research codes.
For example, many applications rely on the PETSc library to solve systems of equations.
These codes generally do not come with standard OS distributions, nor do they usually have a package manager installation available.
It's up to the user to build them from scratch, correctly.

Unfortunately, when this doesn't happen, the top-level application can fail to compile or run correctly, sometimes in very non-intuitive ways.
This can make it very difficult for end-users who aren't computing experts themselves.
Furthermore, we don't always *know* that we have version-specific dependencies because we might only be testing against one version of the underlying dependency (if at all).
Fortunately, we now have a better option for controlling infrastructure - **containers**. 

A container is conceptually similar to a virtual machine, though with less isolation and less overhead. 
[**Docker**](https://www.docker.com/) is the de-facto industry standard for containerization.
Developers build a Docker *image* as a composition of build steps (such as downloading a package, running an installer, or setting an environment variable).
These build steps are captured in a Dockerfile, which is plain text and can be version controlled just like source code.
Then, the image can be deployed to Docker Hub, and users can download the image to use on their own machines.
The container runs its own operating system and has its own file system. 

We use Docker images for automated testing of our research codes.
Each of our major repos has automated tests that trigger when a user makes a pull request or a change is pushed to master.
These tests run on Travis CI (e.g. [here](https://travis-ci.com/github/mdolab/adflow) for our ADflow repo). 
The purpose of these tests is to ensure that changes in a code don't affect that code's behavior

We also have a nightly build process which builds a Docker image from scratch.
It inherits from multiple base images (with different versions of all our external dependencies pre-built), checks out our latest source, compiles the source, and runs automated tests.
The main purpose of this nightly test is to make sure that changes in one code don't break any of the *other codes* since some of them depend on each other.

If the tests pass, an image with our software pre-installed is pushed to Docker hub. 
Users can check out that image and have ready access to all of our open source codes in pre-built form, greatly reducing the learning curve and potential for frustration.

Here's an example of the utility of this approach.
A few weeks ago, a postdoc in our lab gave a CFD tutorial.
The course was only a few hours long, but it started with pulling an image with the pre-built software and environment from Docker hub.
Users on all flavors of Linux, Mac, and even Windows could then start from a known, working environment with everything set up correctly.
It enabled the tutorial to be hands-on instead of a lecture.

It was quite a bit of work (on the order of days) to get the Docker build process set up correctly, but that's only because our build process wasn't as formalized or well-understood as we would like to think.

## Singularity for Executing Workflows on HPC

Docker by itself is fine for executing code on a workstation or laptop. 
However, we often need to use HPC clusters for running more demanding tasks, and this demands additional tools.
HPC resources are shared and users almost invariably do not have root acces; therefore, Docker is not available on these systems.
The high-speed interconnects on these systems also use specific versions of (sometimes) proprietary drivers, and the container image needs to have matching drivers in order for parallel processes to talk to each other correctly.

[**Singularity**](https://sylabs.io/guides/3.3/user-guide/index.html#) addresses the permissions issue.
Singularity is a container engine designed specifically for use on HPC systems.
Developers can create images in Singularity's native definition format, similar to a Dockerfile.
Alternatively, Singularity can pull Docker images and run them without root permission!
The Texas Advanced Computing Center (TACC) has an [excellent tutorial](https://containers-at-tacc.readthedocs.io/en/latest/singularity/01.singularity_basics.html) on the basics of using Singularity.

Singularity supports MPI.
On the host, the user invokes "mpirun singularity ......"
Singularity passes the MPI communicator information on to each container, which runs as a separate process.
Inside the container, your application relies on the same MPI libraries that it would use outside the container.

Processor and communication performance are both critical to massively parallel applications, and in order to use containers on HPC, we need to ensure that no compromise is made here.
Several papers and presentations (e.g. [this](https://insidehpc.com/2019/06/benchmarking-mpi-applications-in-singularity-containers-on-traditional-hpc-and-cloud-infrastructures/) one from ETH Zurich and [this](https://sc19.supercomputing.org/proceedings/tech_poster/poster_files/rpost227s2-file3.pdf) one from Los Alamos) have claimed that the overhead associated with a properly-configured Singularity container is basically nonexistent, but I wanted to verify this claim myself.

I set up two tests to compare a container against "bare metal" (no container). 
The first was Intel's MPI benchmark suite, IMB-MPI1, which is distributed with Intel MPI 2018 and later.
This tests the communication bandwidth.
The second test was a CFD analysis using my lab's [ADflow](https://github.com/mdolab/adflow) solver.
The test case is the NASA Common Research Model (CRM), which is an open model similar to the Boeing 777.
The mesh has 3.1M cells. 
I ensured that the same compilers, compiler flags, and dependency libraries were used in both cases to make sure the test is 'apples to apples'.


![](https://drive.google.com/uc?id=1nOb0GmuWfLVlQvKLDr5V1-o2laVxJsgL){: .img-responsive style="width: 100%"}

Intel IMB-MPI1 benchmark suite on 96 Skylake cores (Stampede2 cluster)
{: .caption }


Using 96 Intel Skylake cores on two physical machines, the MPI benchmarks showed **no communication overhead** when run in a container compared to bare metal!
Averaged CFD benchmark timings were equal to within 0.4% run time (inside the noise of the test). 
For all intents and purposes, this confirms what other researchers are seeing - there is basically no performance penalty associated with using containers on HPC.

There is a *big catch* - the container's MPI needs to be configured to match the MPI on the host system.
In particular, the Infiniband or Omnipath drivers inside the container need to match the host.
Otherwise, the MPI processes won't be able to communicate with each other over the high speed interconnects.
This definitely limits portability of the containers.

Some HPC administrators (including TACC) provide base images with pre-installed MPI.
The developer can then inherit the base image and build everything else on top.
However, this is not a universal practice yet.

I found that there was no pre-configured image that would run on *both* a desktop *and* the OmniPath HPC system at TACC, so I created my own base image using Intel MPI.
I think Intel MPI is probably the way to go for portability.
Using libfabric, Intel MPI allows the user to change which interconnect driver is being used at run time.
For example, it uses a shared memory driver when I run the container on my desktop, but on TACC's Stampede2 cluster, it uses the PSM2 driver to communicate over OmniPath.

<script src="https://gist.github.com/bbrelje/4b17c29e9bd1c0afb6f1979ee0c9d113.js"></script>

In practical terms, this means that **your base Docker image should inherit from an image with pre-installed MPI**.
That way, your workflow can build on top of all the cluster-specific stuff.
Users who need to run on HPC can select the right base image and build the rest on top.
Docker build processes should also be able to take extra compiler flags as input, since many clusters support extra vectorization instruction sets that desktop processors do not (e.g. the AVX-512 instruction set on Skylake and Knight's Landing processors at TACC).

The Glotzer Lab at the University of Michigan is probably the gold standard for this approach right now.
Their Docker build process is [available on Github](https://github.com/glotzerlab/software).
It uses a Python script and Jinja templates to automatically generate a unique docker file for each cluster.
While the base image and MPI drivers are unique to each cluster, the rest of the build process is common.
We have adopted a similar convention for our lab.
