import type { Principal } from '@dfinity/principal';
export interface DAOCanister {
  'addUser' : (arg_0: UID) => Promise<Result>,
  'cancelLike' : (arg_0: UID, arg_1: bigint) => Promise<Result>,
  'deletePost' : (arg_0: UID, arg_1: bigint) => Promise<Result>,
  'deleteUser' : (arg_0: UID) => Promise<Result>,
  'getAllProposal' : () => Promise<Result_4>,
  'getPidOfPost' : (arg_0: bigint) => Promise<[] | [PID__1]>,
  'getTweetLikeUsers' : (arg_0: bigint) => Promise<Result_3>,
  'getUserAllPost' : (arg_0: UID) => Promise<Result_1>,
  'isTweetLiked' : (arg_0: bigint, arg_1: UID) => Promise<Result>,
  'likeAmount' : (arg_0: bigint) => Promise<Result_2>,
  'likePost' : (arg_0: UID, arg_1: bigint) => Promise<Result>,
  'postProposal' : (arg_0: PMD) => Promise<Result>,
  'putPost' : (arg_0: UID, arg_1: PostMD) => Promise<Result>,
  'queryAllPost' : () => Promise<Result_1>,
  'userAddFollow' : (arg_0: UID, arg_1: UID) => Promise<Result>,
  'userCancelFollow' : (arg_0: UID, arg_1: UID) => Promise<Result>,
  'vote' : (arg_0: bigint, arg_1: VoteType) => Promise<Result>,
  'wallet_receive' : () => Promise<bigint>,
}
export interface PID { 'key' : bigint, 'canister_id' : Principal }
export interface PID__1 { 'key' : bigint, 'canister_id' : Principal }
export interface PMD {
  'content' : string,
  'initiator' : UID__1,
  'name' : string,
  'end_time' : string,
  'start_time' : string,
}
export interface Post {
  'pid' : PID,
  'content' : string,
  'time' : string,
  'user' : UID__1,
  'commentNumber' : bigint,
  'likeNumber' : bigint,
  'parentPost' : [] | [PID],
}
export interface PostMD {
  'uid' : UID__1,
  'content' : string,
  'time' : string,
  'parentPost' : [] | [PID],
}
export interface Proposal {
  'metadata' : PMD,
  'canister_id' : Principal,
  'approve' : bigint,
  'disapprove' : bigint,
}
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<Post> } |
  { 'err' : string };
export type Result_2 = { 'ok' : bigint } |
  { 'err' : string };
export type Result_3 = { 'ok' : Array<UID> } |
  { 'err' : string };
export type Result_4 = { 'ok' : Array<Proposal> } |
  { 'err' : string };
export interface UID { 'key' : { 'p' : Principal }, 'canister_id' : Principal }
export interface UID__1 {
  'key' : { 'p' : Principal },
  'canister_id' : Principal,
}
export type VoteType = { 'approve' : null } |
  { 'disapprove' : null };
export interface _SERVICE extends DAOCanister {}
