
# yeoman-gens

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [yeoman-gens](#yeoman-gens)
	* [1.项目介绍](#1项目介绍)
		* [1.1 如何使用](#11-如何使用)
		* [1.2 什么是yeoman](#12-什么是yeoman)
		* [1.3 yeman项目架构](#13-yeman项目架构)
	* [2. react-pc](#2-react-pc)
		* [2.1 架构图](#21-架构图)
		* [2.2 技术选型](#22-技术选型)
	* [3. vue-pc](#3-vue-pc)
		* [3.1 架构图](#31-架构图)
		* [3.2 技术选型](#32-技术选型)
	* [4. angular-pc](#4-angular-pc)
		* [4.1 架构图](#41-架构图)
		* [4.2 技术选型](#42-技术选型)
	* [5. electron](#5-electron)
		* [5.1 架构图](#51-架构图)

<!-- /code_chunk_output -->

## 1.项目介绍

使用yeoman生成的一个脚手架工具，包含一些基础web项目的搭建和模板。

### 1.1 如何使用

```shell
npm install -g yo  //安装yo命令
git clone https://github.com/johnzhu12/yeoman-gens.git
cd yeoman-gens/generator-rocky
npm link
```

然后只要想创建一个项目，比如myapp

```shell
 mkdir myapp
 cd myapp
 yo
```

就会如下图所示的指引，根据指引一步步创建你的项目脚手架
![step1](./docs/imgs/demo1.png)

### 1.2 什么是yeoman

[yeoman介绍](http://yeoman.io)

[API](http://yeoman.io/generator/Generator.html)

yeoman是一个脚手架工具，提供构建生态系统,可以设计丰富的交互来创建新的项目，提高效率。

### 1.3 yeman项目架构

![yeoman-arch](./docs/imgs/yeoman-arch.jpg)

## 2. react-pc

### 2.1 架构图

![react-arch](./docs/imgs/react-arch.jpg)

### 2.2 技术选型

typescript,antd,mobx,styled-component。

## 3. vue-pc

### 3.1 架构图

### 3.2 技术选型

typescript,element-ui,mobx,vue-router

## 4. angular-pc

### 4.1 架构图

### 4.2 技术选型

typescript,rxjs,ngrx/store

## 5. electron

### 5.1 架构图