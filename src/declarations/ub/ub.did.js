export const idlFactory = ({ IDL }) => {
  const Branch = IDL.Rec();
  const List = IDL.Rec();
  const DAO = IDL.Record({
    'name' : IDL.Text,
    'canisters' : IDL.Vec(IDL.Principal),
  });
  const MetaData = IDL.Record({
    'dao' : IDL.Vec(DAO),
    'img' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'text' : IDL.Text,
    'uname' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const DAO_Key = IDL.Record({
    'name' : IDL.Text,
    'canisters' : IDL.Vec(IDL.Principal),
  });
  const Hash = IDL.Nat32;
  const Key = IDL.Record({ 'key' : DAO_Key, 'hash' : Hash });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(Key, IDL.Null), List)));
  const AssocList = IDL.Opt(IDL.Tuple(IDL.Tuple(Key, IDL.Null), List));
  const Leaf = IDL.Record({ 'size' : IDL.Nat, 'keyvals' : AssocList });
  const Trie = IDL.Variant({
    'branch' : Branch,
    'leaf' : Leaf,
    'empty' : IDL.Null,
  });
  Branch.fill(IDL.Record({ 'left' : Trie, 'size' : IDL.Nat, 'right' : Trie }));
  const Set = IDL.Variant({
    'branch' : Branch,
    'leaf' : Leaf,
    'empty' : IDL.Null,
  });
  const Profile = IDL.Record({
    'dao' : Set,
    'img' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'text' : IDL.Text,
    'uname' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : Profile, 'err' : IDL.Text });
  const UserBucket = IDL.Service({
    'add' : IDL.Func([MetaData], [Result_1], []),
    'available' : IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
    'del' : IDL.Func([], [Result_1], []),
    'get' : IDL.Func([], [Result], ['query']),
    'getBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'getMemory' : IDL.Func([], [IDL.Text], ['query']),
    'wallet_receive' : IDL.Func([], [IDL.Nat], []),
  });
  return UserBucket;
};
export const init = ({ IDL }) => { return []; };
