DROP DATABASE taxonomy;
CREATE DATABASE taxonomy;
USE taxonomy;

CREATE TABLE `Domain` (
  `name` varchar(100),
  `life_name` varchar(100),
  PRIMARY KEY (`name`)
);

CREATE TABLE `Life` (
  `name` varchar(100),
  PRIMARY KEY (`name`)
);

CREATE TABLE `Family` (
  `name` varchar(100),
  `order_name` varchar(100),
  PRIMARY KEY (`name`)
);

CREATE TABLE `Kingdom` (
  `name` varchar(100),
  `domain_name` varchar(100),
  PRIMARY KEY (`name`)
);

CREATE TABLE `Genus` (
  `name` varchar(100),
  `family_name` varchar(100),
  PRIMARY KEY (`name`)
);

CREATE TABLE `Order` (
  `name` varchar(100),
  `class_name` varchar(100),
  PRIMARY KEY (`name`)
);

CREATE TABLE `Phylum` (
  `name` varchar(100),
  `kingdom_name` varchar(100),
  PRIMARY KEY (`name`)
);

CREATE TABLE `Species` (
  `name` varchar(100),
  `genus_name` varchar(100),
  PRIMARY KEY (`name`)
);

CREATE TABLE `Class` (
  `name` varchar(100),
  `phylum_name` varchar(100),
  PRIMARY KEY (`name`)
);

