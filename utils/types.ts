export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

export interface IChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
  explorer?: string;
}


export interface ICourseObject {
  /** Title of the course - displayed in nav */
  title: string;
  /** Relative path to the file containing this course */
  file: string; 
  /** data for this course - object of answers or string of code */
  data: any;
}

export interface ICourseCategoryObject {
  /** The title of the category */
  title: string;
  /** Description for the category - appears on course cards */
  description: string;
  /** Difficulty of this category */
  difficulty: number;
  /** Boolean used to show / hide the restricted badge on course categories */
  restricted: boolean;
  /** Array of course objects */
  courses: {[key: string]: ICourseObject}
}

export interface ICourseListObject {
  [key: string]: ICourseCategoryObject
}