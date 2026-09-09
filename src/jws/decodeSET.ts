interface JWSParts {
  header: string;
  payload: string;
  signature: string;
}

interface DecodedSET {
  decodedHeader: unknown;
  decodedPayload: unknown;
  signature: string;
}

/**
 * Splits a compact JWS token into its three base64url-encoded parts.
 *
 * @param set - The compact JWS string.
 * @returns The header, payload, and signature parts.
 */
export function getJWSParts(set: string): JWSParts {
  const parts = set.split(".");
  return { header: parts[0] ?? "", payload: parts[1] ?? "", signature: parts[2] ?? "" };
}

/**
 * Decodes a Security Event Token (SET), returning the parsed header, payload, and raw signature.
 *
 * @param set - The compact JWS string to decode.
 * @returns The decoded header, decoded payload, and raw signature.
 * @throws {Error} If the token cannot be decoded.
 */
export function decodeSET(set: string): DecodedSET {
  try {
    const parts = getJWSParts(set);
    const decodedHeader = JSON.parse(
      Buffer.from(parts.header, "base64url").toString("utf8"),
    ) as unknown;
    const decodedPayload = JSON.parse(
      Buffer.from(parts.payload, "base64url").toString("utf8"),
    ) as unknown;
    return { decodedHeader, decodedPayload, signature: parts.signature };
  } catch {
    throw new Error("FailedToDecodeSET");
  }
}
