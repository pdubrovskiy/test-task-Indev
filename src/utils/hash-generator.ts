import * as uuid from 'uuid';

export function generateHash() {
  const activationLink = uuid.v4();
  return activationLink.toString();
}
