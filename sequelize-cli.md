# Sequelize Cli

- Create model

```cmd
sequelize-cli model:generate --name [model name] --attributes [..props]
```

- Run model

```cmd
sequelize-cli db:migrate
```

- Undo model

```cmd
sequelize-cli db:migrate:undo:all
```

- Create seed

```cmd
sequelize-cli seed:generate --name [seed name]
```

- Run seed

```cmd
sequelize-cli db:seed:all
```

- Undo seed

```cmd
sequelize-cli db:seed:undo:all
```
