import { Url } from 'url/entities/url.entity';
import { User } from 'user/entities/user.entity';

export interface LogMetaData {
  user?: User['username'] | null;
  urlId?: Url['id'] | null;
  email?: User['email'] | null;
  expiredAt?: Url['expires_at'] | null;
  error?: string | null;
}
