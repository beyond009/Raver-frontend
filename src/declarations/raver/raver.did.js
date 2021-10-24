export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Principal, 'err' : IDL.Text });
  const DAO_Key = IDL.Record({
    'name' : IDL.Text,
    'canisters' : IDL.Vec(IDL.Principal),
  });
  const MetaData = IDL.Record({
    'dao' : IDL.Vec(DAO_Key),
    'img' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'text' : IDL.Text,
    'uname' : IDL.Text,
  });
  const DAO_Segment = IDL.Record({
    'name' : IDL.Text,
    'canisters' : IDL.Vec(IDL.Principal),
  });
  const Result = IDL.Variant({
    'ok' : IDL.Tuple(IDL.Principal, IDL.Vec(DAO_Segment)),
    'err' : IDL.Tuple(IDL.Text, IDL.Vec(DAO_Segment)),
  });
  const Raver = IDL.Service({
    'createDao' : IDL.Func([IDL.Text], [Result_1], []),
    'getAvalMemory' : IDL.Func([], [IDL.Nat], ['query']),
    'getBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'getMemory' : IDL.Func([], [IDL.Nat], ['query']),
    'register' : IDL.Func([MetaData], [Result_1], []),
    'start' : IDL.Func([], [Result], ['query']),
    'wallet_receive' : IDL.Func([], [IDL.Nat], []),
  });
  return Raver;
};
export const init = ({ IDL }) => { return []; };
