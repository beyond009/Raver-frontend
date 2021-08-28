import type { Principal } from '@dfinity/principal';
export type Avatarimg = string;
export type BIO = string;
export type NickName = string;
export interface ShowTweet {
  'tid' : bigint,
  'url' : string,
  'content' : string,
  'time' : string,
  'user' : User__1,
  'parentTweet' : [] | [parentTweet],
  'commentNumber' : bigint,
  'likeNumber' : bigint,
}
export interface ShowUser {
  'bio' : BIO,
  'uid' : UID,
  'nickname' : NickName,
  'username' : UserName,
  'avatarimg' : Avatarimg,
}
export type UID = Principal;
export interface User {
  'uid' : UID,
  'nickname' : NickName,
  'username' : UserName,
  'avatarimg' : Avatarimg,
}
export type UserName = string;
export interface User__1 {
  'uid' : UID,
  'nickname' : NickName,
  'username' : UserName,
  'avatarimg' : Avatarimg,
}
export interface parentTweet {
  'cor' : boolean,
  'tid' : bigint,
  'url' : string,
  'content' : string,
  'time' : string,
  'user' : User__1,
}
export interface _SERVICE {
  'addComment' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: bigint,
    ) => Promise<boolean>,
  'addFollow' : (arg_0: Principal) => Promise<boolean>,
  'addTweet' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: bigint,
    ) => Promise<boolean>,
  'addUser' : (arg_0: string, arg_1: string, arg_2: string) => Promise<boolean>,
  'cancelFollow' : (arg_0: Principal) => Promise<boolean>,
  'cancelLike' : (arg_0: bigint) => Promise<boolean>,
  'changeTweet' : (
      arg_0: bigint,
      arg_1: string,
      arg_2: string,
      arg_3: string,
    ) => Promise<boolean>,
  'changeUserProfile' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
    ) => Promise<boolean>,
  'deleteComment' : (arg_0: bigint) => Promise<boolean>,
  'deleteTweet' : (arg_0: bigint) => Promise<boolean>,
  'deleteTweetAllComment' : (arg_0: bigint) => Promise<boolean>,
  'deleteUser' : () => Promise<boolean>,
  'getBio' : (arg_0: Principal) => Promise<string>,
  'getFollow' : (arg_0: Principal) => Promise<Array<ShowUser>>,
  'getFollowAmount' : (arg_0: Principal) => Promise<bigint>,
  'getFollowLastestAmountTweets' : (arg_0: bigint, arg_1: bigint) => Promise<
      Array<ShowTweet>
    >,
  'getFollowOlder50Tweets' : (arg_0: bigint) => Promise<Array<ShowTweet>>,
  'getFollower' : (arg_0: Principal) => Promise<Array<ShowUser>>,
  'getFollowerAmount' : (arg_0: Principal) => Promise<bigint>,
  'getHot20Tweets' : (arg_0: bigint) => Promise<Array<ShowTweet>>,
  'getLastestTweeTid' : () => Promise<bigint>,
  'getNew20Tweets' : (arg_0: bigint) => Promise<Array<ShowTweet>>,
  'getShowUserProfileByPrincipal' : () => Promise<ShowUser>,
  'getShowUserProfileByUserName' : (arg_0: string) => Promise<ShowUser>,
  'getTweetById' : (arg_0: bigint) => Promise<ShowTweet>,
  'getTweetCommentNumber' : (arg_0: bigint) => Promise<bigint>,
  'getTweetLikeUsers' : (arg_0: bigint) => Promise<Array<Principal>>,
  'getTweetOlder20Comments' : (arg_0: bigint, arg_1: bigint) => Promise<
      Array<ShowTweet>
    >,
  'getUserAllTweets' : (arg_0: Principal) => Promise<Array<ShowTweet>>,
  'getUserOlder20Tweets' : (arg_0: Principal, arg_1: bigint) => Promise<
      Array<ShowTweet>
    >,
  'getUserProfile' : () => Promise<User>,
  'isAFollowedByB' : (arg_0: Principal, arg_1: Principal) => Promise<boolean>,
  'isTweetExist' : (arg_0: bigint) => Promise<boolean>,
  'isTweetLiked' : (arg_0: bigint) => Promise<boolean>,
  'isTwoUserFollowEachOther' : (arg_0: Principal, arg_1: Principal) => Promise<
      boolean
    >,
  'isUserExist' : () => Promise<boolean>,
  'isUserNameUsed' : (arg_0: string) => Promise<boolean>,
  'likeAmount' : (arg_0: bigint) => Promise<bigint>,
  'likeTweet' : (arg_0: bigint) => Promise<boolean>,
  'putBio' : (arg_0: string) => Promise<undefined>,
  'reTweet' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: bigint,
    ) => Promise<boolean>,
}
