// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { generateService, GenerateServiceProps } = require("openapi2typescript");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openApi = [
  {
    requestLibPath: "import { request } from '@/utils/request'", // 想怎么引入封装请求方法
    schemaPath: "http://localhost:6688/doc-json", // openAPI规范地址
    mockFolder:"./mock",
    // projectName: "nestAdmin", // 生成到哪个目录内
    namespace: "NESTADMIN",
    serversPath: "./src/service", // 生成代码到哪个目录
    hook: {
      afterOpenApiDataInited: (openAPIData: any) => {
        const paths: any = {};
        Object.entries(openAPIData?.paths)?.map?.(([k, v]) => {
          paths[k.replace("/v1", "/api")] = v;
        });
        return { ...openAPIData, paths };
      },
      customClassName: (tag: string) => {
        const tagArr = tag?.split("-");
        return tagArr[1] ? tagArr[0].toLowerCase() : tag;
      },
      customType: (
        schemaObject: {"$ref":string,type:string},
        namespace: string,
      ) => {

        if(schemaObject?.$ref?.endsWith?.("/ResponseVo")) {
          return `${namespace}.ResponseVo<string>`
        } 
      }
  
    },
  },
];

async function run() {
  for (let index = 0; index < openApi.length; index++) {
    await generateService(openApi[index]);
  }
}

run();
