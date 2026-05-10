
ENV_FILE ?= ./tetris.dev.env



ifneq (,$(wildcard $(ENV_FILE)))
    include $(ENV_FILE)
    export
endif



run-dev:
	pnpm run dev