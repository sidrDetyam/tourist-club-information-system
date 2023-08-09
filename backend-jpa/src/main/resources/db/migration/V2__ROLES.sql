
insert into roles (id, role_name)
values (1, 'USER'), (2, 'ADMIN');

insert into trainer_categories(id, value)
values (1, 'Обычный'), (2, 'Крутой');

insert into tourist_categories(id, value)
values (1, 'Первая'), (2, 'Вторая');

insert into users(id, username, password)
values (0, 'admin', 'y');

insert into users_roles(user_id, role_id)
values (0, 1), (0, 2);