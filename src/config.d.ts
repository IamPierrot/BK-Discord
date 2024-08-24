declare interface Config extends Readonly<Record<string, unknown>> {
     readonly MONGO: string
     readonly GEMINI: string
     readonly app: Readonly<{
          token: string;
          global: boolean;
          guild: string;
          ExtraMessages: boolean;
          loopMessage: boolean;
          client: string;
          prefix: string;
     }>;
     readonly opt: Readonly<{
          idDev: string[];
     }>;
     readonly levelSystems: Readonly<{
          xp: number;
          cooldown: number;
          extraXP: number;
     }>;
}

declare var configure: Config;