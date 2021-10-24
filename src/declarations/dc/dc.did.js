export const idlFactory = ({ IDL }) => {
  const UID = IDL.Record({
    'key' : IDL.Record({ 'p' : IDL.Principal }),
    'canister_id' : IDL.Principal,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const UID__1 = IDL.Record({
    'key' : IDL.Record({ 'p' : IDL.Principal }),
    'canister_id' : IDL.Principal,
  });
  const PMD = IDL.Record({
    'content' : IDL.Text,
    'initiator' : UID__1,
    'name' : IDL.Text,
    'end_time' : IDL.Text,
    'start_time' : IDL.Text,
  });
  const Proposal = IDL.Record({
    'metadata' : PMD,
    'canister_id' : IDL.Principal,
    'approve' : IDL.Nat,
    'disapprove' : IDL.Nat,
  });
  const Result_4 = IDL.Variant({ 'ok' : IDL.Vec(Proposal), 'err' : IDL.Text });
  const PID__1 = IDL.Record({ 'key' : IDL.Nat, 'canister_id' : IDL.Principal });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Vec(UID), 'err' : IDL.Text });
  const PID = IDL.Record({ 'key' : IDL.Nat, 'canister_id' : IDL.Principal });
  const Post = IDL.Record({
    'pid' : PID,
    'content' : IDL.Text,
    'time' : IDL.Text,
    'user' : UID__1,
    'commentNumber' : IDL.Nat,
    'likeNumber' : IDL.Nat,
    'parentPost' : IDL.Opt(PID),
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Vec(Post), 'err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const PostMD = IDL.Record({
    'uid' : UID__1,
    'content' : IDL.Text,
    'time' : IDL.Text,
    'parentPost' : IDL.Opt(PID),
  });
  const VoteType = IDL.Variant({
    'approve' : IDL.Null,
    'disapprove' : IDL.Null,
  });
  const DAOCanister = IDL.Service({
    'addUser' : IDL.Func([UID], [Result], []),
    'cancelLike' : IDL.Func([UID, IDL.Nat], [Result], []),
    'deletePost' : IDL.Func([UID, IDL.Nat], [Result], []),
    'deleteUser' : IDL.Func([UID], [Result], []),
    'getAllProposal' : IDL.Func([], [Result_4], ['query']),
    'getPidOfPost' : IDL.Func([IDL.Nat], [IDL.Opt(PID__1)], ['query']),
    'getTweetLikeUsers' : IDL.Func([IDL.Nat], [Result_3], ['query']),
    'getUserAllPost' : IDL.Func([UID], [Result_1], ['query']),
    'isTweetLiked' : IDL.Func([IDL.Nat, UID], [Result], ['query']),
    'likeAmount' : IDL.Func([IDL.Nat], [Result_2], ['query']),
    'likePost' : IDL.Func([UID, IDL.Nat], [Result], []),
    'postProposal' : IDL.Func([PMD], [Result], []),
    'putPost' : IDL.Func([UID, PostMD], [Result], []),
    'queryAllPost' : IDL.Func([], [Result_1], ['query']),
    'userAddFollow' : IDL.Func([UID, UID], [Result], []),
    'userCancelFollow' : IDL.Func([UID, UID], [Result], []),
    'vote' : IDL.Func([IDL.Nat, VoteType], [Result], []),
    'wallet_receive' : IDL.Func([], [IDL.Nat], []),
  });
  return DAOCanister;
};
export const init = ({ IDL }) => { return []; };
