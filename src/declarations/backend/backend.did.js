export const idlFactory = ({ IDL }) => {
  const BIO = IDL.Text;
  const UID = IDL.Principal;
  const NickName = IDL.Text;
  const UserName = IDL.Text;
  const Avatarimg = IDL.Text;
  const ShowUser = IDL.Record({
    'bio' : BIO,
    'uid' : UID,
    'nickname' : NickName,
    'username' : UserName,
    'avatarimg' : Avatarimg,
  });
  const User__1 = IDL.Record({
    'uid' : UID,
    'nickname' : NickName,
    'username' : UserName,
    'avatarimg' : Avatarimg,
  });
  const parentTweet = IDL.Record({
    'cor' : IDL.Bool,
    'tid' : IDL.Nat,
    'url' : IDL.Text,
    'content' : IDL.Text,
    'time' : IDL.Text,
    'user' : User__1,
  });
  const ShowTweet = IDL.Record({
    'tid' : IDL.Nat,
    'url' : IDL.Text,
    'content' : IDL.Text,
    'time' : IDL.Text,
    'user' : User__1,
    'parentTweet' : IDL.Opt(parentTweet),
    'commentNumber' : IDL.Nat,
    'likeNumber' : IDL.Nat,
  });
  const User = IDL.Record({
    'uid' : UID,
    'nickname' : NickName,
    'username' : UserName,
    'avatarimg' : Avatarimg,
  });
  return IDL.Service({
    'addComment' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Int],
        [IDL.Bool],
        [],
      ),
    'addFollow' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'addTweet' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Int],
        [IDL.Bool],
        [],
      ),
    'addUser' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Bool], []),
    'cancelFollow' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'cancelLike' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'changeTweet' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'changeUserProfile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'deleteComment' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'deleteTweet' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'deleteTweetAllComment' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'deleteUser' : IDL.Func([], [IDL.Bool], []),
    'getBio' : IDL.Func([IDL.Principal], [IDL.Text], ['query']),
    'getFollow' : IDL.Func([IDL.Principal], [IDL.Vec(ShowUser)], ['query']),
    'getFollowAmount' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getFollowLastestAmountTweets' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(ShowTweet)],
        ['query'],
      ),
    'getFollowOlder50Tweets' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(ShowTweet)],
        ['query'],
      ),
    'getFollower' : IDL.Func([IDL.Principal], [IDL.Vec(ShowUser)], ['query']),
    'getFollowerAmount' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getLastestTweeTid' : IDL.Func([], [IDL.Nat], ['query']),
    'getShowUserProfileByPrincipal' : IDL.Func([], [ShowUser], ['query']),
    'getShowUserProfileByUserName' : IDL.Func(
        [IDL.Text],
        [ShowUser],
        ['query'],
      ),
    'getTweetById' : IDL.Func([IDL.Nat], [ShowTweet], ['query']),
    'getTweetCommentNumber' : IDL.Func([IDL.Nat], [IDL.Nat], ['query']),
    'getTweetLikeUsers' : IDL.Func(
        [IDL.Nat],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'getTweetOlder20Comments' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(ShowTweet)],
        ['query'],
      ),
    'getUserAllTweets' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(ShowTweet)],
        ['query'],
      ),
    'getUserLastestTenTweets' : IDL.Func([], [IDL.Vec(ShowTweet)], []),
    'getUserOlder20Tweets' : IDL.Func(
        [IDL.Principal, IDL.Nat],
        [IDL.Vec(ShowTweet)],
        ['query'],
      ),
    'getUserProfile' : IDL.Func([], [User], ['query']),
    'isAFollowedByB' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Bool],
        ['query'],
      ),
    'isExist' : IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
    'isTweetLiked' : IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
    'isTwoUserFollowEachOther' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Bool],
        ['query'],
      ),
    'isUserExist' : IDL.Func([], [IDL.Bool], ['query']),
    'isUserNameUsed' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'likeAmount' : IDL.Func([IDL.Nat], [IDL.Nat], ['query']),
    'likeTweet' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'putBio' : IDL.Func([IDL.Text], [], ['oneway']),
    'reTweet' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Int],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
