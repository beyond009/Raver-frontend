import type { Principal } from '@dfinity/principal';
export interface DAO_Key { 'name' : string, 'canisters' : Array<Principal> }
export interface DAO_Segment { 'name' : string, 'canisters' : Array<Principal> }
export interface MetaData {
  'dao' : Array<DAO_Key>,
  'img' : Array<Array<number>>,
  'text' : string,
  'uname' : string,
}
export interface Raver {
  'createDao' : (arg_0: string) => Promise<Result_1>,
  'getAvalMemory' : () => Promise<bigint>,
  'getBalance' : () => Promise<bigint>,
  'getMemory' : () => Promise<bigint>,
  'register' : (arg_0: MetaData) => Promise<Result_1>,
  'start' : () => Promise<Result>,
  'wallet_receive' : () => Promise<bigint>,
}
export type Result = { 'ok' : [Principal, Array<DAO_Segment>] } |
  { 'err' : [string, Array<DAO_Segment>] };
export type Result_1 = { 'ok' : Principal } |
  { 'err' : string };
export interface _SERVICE extends Raver {}
