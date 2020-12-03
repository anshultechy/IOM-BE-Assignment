define start_task =
    yarn start
endef

define build_task =
    yarn install
endef

define build_start_task =
    yarn start
endef

define build_start_prod_task =
    yarn add pm2 global
    yarn install
    yarn pm2prod
endef

run: ; $(value $(TASK))
.ONESHELL:
