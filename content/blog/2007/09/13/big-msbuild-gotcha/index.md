---
layout: post
title: "Big msbuild gotcha"
date: 2007-09-13T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
<a href="http://msdn2.microsoft.com/en-us/library/0k6kkbsd.aspx" title="Msbuild reference on MSDN">Msbuild</a> is not necessarily a "real" component of <a href="http://www.krazyyak.com/category/tfs/">TFS</a>, but it is heavily integrated throughout its build system (as well as Visual Studio 2005), so I'll be recording my thoughts on it as well. It seems to be better than <a href="http://nant.sourceforge.net/">NAnt</a>, a similar open source product, in most regards, but I have spent the better part of a day getting to the bottom of one of its maddening quirks.

You can define an <a href="http://msdn2.microsoft.com/en-us/library/646dk05y.aspx" title="ItemGroup element reference on MSDN">&lt;ItemGroup&gt;</a> consisting of files that you can copy, zip up, or do whatever you want with, but the collection it will only be evaluated at the initialization of the script!

For example, say you need to deploy all the files compiled by a solution, and then do something else with the binaries. Your build script may look something like this:

```
  &lt;ItemGroup&gt;
        &lt;WebDeploy Exclude="@(ExcludedTypes)" Include="**\**"&gt;
        &lt;BinDeploy Include="$(DeployDir)\bin\*.dll"&gt;
&lt;/ItemGroup&gt;

&lt;Target DependsOn="Compile" Name="Deploy"&gt;
        &lt;Copy DestinationFolder="$(DeployDir)\%(RecursiveDir)" SourceFiles="@(WebDeploy)"&gt;
        &lt;Copy DestinationFolder="$(BinDeployFolder)" SourceFiles="@(BinDeploy)"&gt;
&lt;/Target&gt;

The @(BinDeploy) group will evaluate <em>at the start of the script</em>. This means that if you have a "clean" folder setup, the group will be empty, even after the Copy task has been executed. Additionally, if you run the script a second time without deleting the contents of the $(DeployDir), the script will happily copy over the prior build's binaries (even if a Delete task has "deleted" them, and they've been "replaced" by a fresh compile).

To fix this problem, you need to use the <a href="http://msdn2.microsoft.com/en-us/library/s2y3e43x.aspx" title="CreateItem task reference on MSDN">CreateItem</a> task:

```
  &lt;ItemGroup&gt;
        &lt;WebDeploy Exclude="@(ExcludedTypes)" Include="**\**"&gt;

&lt;Target DependsOn="Compile" Name="Deploy"&gt;
        &lt;Copy DestinationFolder="$(DeployDir)\%(RecursiveDir)" SourceFiles="@(WebDeploy)"&gt;
        &lt;CreateItem Include="$(PathToCompiledBinaries)\*.dll"&gt;
                &lt;Output ItemName="BinDeploy" TaskParameter="Include" /&gt;
        &lt;/CreateItem&gt;
        &lt;Copy DestinationFolder="$(BinDeployFolder)" SourceFiles="@(BinDeploy)"&gt;
&lt;/Target&gt;
```

This will guarantee that @(BinDeploy) isn't created until there are files for it. Do note that this "feature" happens for everything that uses ItemGroups this way; it's not just limited to the Copy task.