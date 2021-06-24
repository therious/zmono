import axios from "axios";



export interface ConfigSingleton {
  queryParams: Record<string,string>;
  [key:string]: Record<string, any>;
}

function deepFreeze(o:any)
{
  Object.freeze(o);
  Object
    .getOwnPropertyNames(o)
    .forEach(prop=>deepFreeze(o[prop]));
}

async function fetchConfig(url:string):Promise<any>
{
  console.info(`fetching configuration at ${url}`);
  let result;
  try {
    result = (await axios.get(url)).data;

  } catch(err) {
    console.error(`Could not load configuration from ${url}`, err);
    throw err;
  }
  return result;
}

export let promisedConfig:ConfigSingleton|null = null;

export class Config
{
  public static async fetch(configUrl:string): Promise<ConfigSingleton>
  {
    let configObject:ConfigSingleton;

    configObject = await fetchConfig(configUrl);
    configObject.queryParams = Object?.fromEntries([...new URLSearchParams(globalThis?.location?.search)]);

    promisedConfig = configObject;
    return promisedConfig;

  }
  public static singleton():ConfigSingleton
  {
    if(promisedConfig)
      return promisedConfig;
    throw new Error(`singleton referenced before fetch`);
  }

}