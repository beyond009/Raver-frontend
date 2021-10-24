import type { Principal } from '@dfinity/principal';
export type AssocList = [] | [[[Key, null], List]];
export interface Branch { 'left' : Trie, 'size' : bigint, 'right' : Trie }
export interface DAO { 'name' : string, 'canisters' : Array<Principal> }
export interface DAO_Key { 'name' : string, 'canisters' : Array<Principal> }
export type Hash = number;
export interface Key { 'key' : DAO_Key, 'hash' : Hash }
export interface Leaf { 'size' : bigint, 'keyvals' : AssocList }
export type List = [] | [[[Key, null], List]];
export interface MetaData {
  'dao' : Array<DAO>,
  'img' : Array<Array<number>>,
  'text' : string,
  'uname' : string,
}
export interface Profile {
  'dao' : Set,
  'img' : Array<Array<number>>,
  'text' : string,
  'uname' : string,
}
export type Result = { 'ok' : Profile } |
  { 'err' : string };
export type Result_1 = { 'ok' : string } |
  { 'err' : string };
export type Set = { 'branch' : Branch } |
  { 'leaf' : Leaf } |
  { 'empty' : null };
export type Trie = { 'branch' : Branch } |
  { 'leaf' : Leaf } |
  { 'empty' : null };
export interface UserBucket {
  'add' : (arg_0: MetaData) => Promise<Result_1>,
  'available' : (arg_0: bigint) => Promise<boolean>,
  'del' : () => Promise<Result_1>,
  'get' : () => Promise<Result>,
  'getBalance' : () => Promise<bigint>,
  'getMemory' : () => Promise<string>,
  'wallet_receive' : () => Promise<bigint>,
}
export interface _SERVICE extends UserBucket {}
