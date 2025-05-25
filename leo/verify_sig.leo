program verify_sig.aleo;

import schnorr;

function verify_signature(msg_hash: field, sig: [field; 2], pub_key: group) -> bool {
    return schnorr::verify(msg_hash, sig, pub_key);
}
