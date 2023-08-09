create sequence competitions_seq
    increment by 50;

create sequence control_points_seq
    increment by 50;

create sequence hike_diary_records_seq
    increment by 50;

create sequence hikes_seq
    increment by 50;

create sequence roles_seq
    increment by 50;

create sequence routes_seq
    increment by 50;

create sequence schedule_seq
    increment by 50;

create sequence section_groups_seq
    increment by 50;

create sequence sections_seq
    increment by 50;

create sequence tourist_categories_seq
    increment by 50;

create sequence trainer_categories_seq
    increment by 50;

create sequence users_seq
    increment by 50;

create table competitions
(
    id bigint not null
        primary key
);

create table control_points
(
    id          bigint not null
        primary key,
    description varchar(255),
    point       varchar(255)
);

create table roles
(
    id        bigint not null
        primary key,
    role_name varchar(255)
);

create table tourist_categories
(
    id    bigint not null
        primary key,
    value varchar(255)
);

create table routes
(
    id          bigint not null
        primary key,
    description varchar(255),
    name        varchar(255),
    category_id bigint
        constraint fko9nysw0u5fjwim0t980v05reo
            references tourist_categories
);

create table routes_control_points
(
    route_id bigint not null
        constraint fkmud4mwwox4smw05t276pfw41o
            references routes,
    point_id bigint not null
        constraint fklfrlin8xnfimymrnf9kccosmt
            references control_points,
    primary key (route_id, point_id)
);

create table trainer_categories
(
    id    bigint not null
        primary key,
    value varchar(255)
);

create table users
(
    id            bigint not null
        primary key,
    email         varchar(255),
    first_name    varchar(255),
    last_name     varchar(255),
    password      varchar(255),
    refresh_token varchar(255),
    username      varchar(255)
);

create table section_managers
(
    hired_date date,
    id         bigint not null
        primary key
        constraint fkhps182vc4dt08junp4ug2jaof
            references users
);

create table sections
(
    id          bigint not null
        primary key,
    description varchar(100000),
    name        varchar(255),
    manager_id  bigint
        constraint fk3ji8sypeyxj8uq7msjv4l3ie1
            references section_managers
);

create table tourists
(
    id          bigint not null
        primary key
        constraint fkl9gncb5pmbjl6d48pf800ijp7
            references users,
    category_id bigint
        constraint fki51skr8cam4wyx5w6lo5fdun7
            references tourist_categories
);

create table trainers
(
    id                  bigint not null
        primary key
        constraint fkchfnwi5murfsp9hckjcdscsid
            references tourists,
    section_id          bigint
        constraint fk6g8mgyxknctyub05n3aur3sb9
            references sections,
    trainer_category_id bigint
        constraint fklyc3yk7rlqepj1rm49y9bb7tt
            references trainer_categories
);

create table hikes
(
    id          bigint not null
        primary key,
    description varchar(255),
    end_        timestamp(6),
    name        varchar(255),
    start_      timestamp(6),
    route_id    bigint
        constraint fklc25hyhae2hycat5sxnnmv79y
            references routes,
    trainer_id  bigint
        constraint fkmx9ywatn3d3800v038mfmhtys
            references trainers
);

create table hike_diary_records
(
    id         bigint not null
        primary key,
    record     varchar(255),
    time_stamp timestamp(6),
    hike_id    bigint not null
        constraint fkiktt4kv8ekkwrtdu6aakx4uys
            references hikes
);

create table section_groups
(
    id         bigint not null
        primary key,
    name       varchar(255),
    section_id bigint not null
        constraint fk93ah67g6iyog3akw6axq0ivhb
            references sections,
    trainer_id bigint
        constraint fkt8wkf2u2yvooaawf68n1sij01
            references trainers
);

create table schedule
(
    id               bigint not null
        primary key,
    day              bigint,
    place            varchar(255),
    time_            time,
    type             varchar(255),
    section_group_id bigint not null
        constraint fkdnx5v599gqn79m3c49r8xtilt
            references section_groups
);

create table tourists_hikes
(
    tourist_id bigint not null
        constraint fktgakmcq5fffgf8rigxkjiuhmr
            references tourists,
    hike_id    bigint not null
        constraint fk6p7ac8k1l0gj3qodhgmv8h22b
            references hikes,
    primary key (tourist_id, hike_id)
);

create table tourists_section_groups
(
    tourist_id       bigint not null
        constraint fkdqbamq7re4i7o72it135ts50f
            references tourists,
    section_group_id bigint not null
        constraint fk3q5h844brt4f6a2r31vbr5bkn
            references section_groups,
    primary key (tourist_id, section_group_id)
);

create table users_roles
(
    user_id bigint not null
        constraint fk2o0jvgh89lemvvo17cbqvdxaa
            references users,
    role_id bigint not null
        constraint fkj6m8fwv7oqv74fcehir1a9ffy
            references roles,
    primary key (user_id, role_id)
);

