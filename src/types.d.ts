import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "index";
    readonly columns: readonly [
      {
        readonly name: "url";
        readonly type: "string";
        readonly unique: true;
      },
      {
        readonly name: "content";
        readonly type: "text";
      },
      {
        readonly name: "excerpt";
        readonly type: "text";
        readonly notNull: true;
        readonly defaultValue: " ";
      },
      {
        readonly name: "title";
        readonly type: "string";
      }
    ];
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type Index = InferredTypes["index"];
export type IndexRecord = Index & XataRecord;
export type DatabaseSchema = {
  index: IndexRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
