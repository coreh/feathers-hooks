import * as feathers from 'feathers';

declare module 'feathers' {
  interface Application {
    hooks(hooks: hooks.HooksObject<{}>): Application;
  }

  interface Service<T> {
    before(hooks: hooks.HookMap<T>): Application;
    after(hooks: hooks.HookMap<T>): Application;
    hooks(hooks: hooks.HooksObject<T>): Application;
  }
}

declare function hooks(): () => void;

declare namespace hooks {
  interface Hook<T> {
    (hook: HookProps<T>): Promise<any> | void;
  }

  interface HookProps<T> {
    method?: string;
    type: 'before' | 'after' | 'error';
    params?: any;
    data?: T;
    result?: T;
    app?: feathers.Application;
  }

  interface HookMap<T> {
    all?: Hook<T> | Hook<T>[];
    find?: Hook<T> | Hook<T>[];
    get?: Hook<T> | Hook<T>[];
    create?: Hook<T> | Hook<T>[];
    update?: Hook<T> | Hook<T>[];
    patch?: Hook<T> | Hook<T>[];
    remove?: Hook<T> | Hook<T>[];
  }

  interface HooksObject<T> {
    before?: HookMap<T>;
    after?: HookMap<T>;
    error?: HookMap<T>;
  }
}

export = hooks;
