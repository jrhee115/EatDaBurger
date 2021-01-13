use cmz46a9nv7bhne0o;

drop burgers_db if exists;
create database burgers_db;
use burgers_db;

drop table burgers;
create table burgers (
    id int auto_increment not null primary key,
    name varchar(150) not null,
    devoured boolean default false
);