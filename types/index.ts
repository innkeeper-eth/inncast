export type State = {
  total_button_presses: number;
};
export type InnEvent = {
  status: string;
  date: string;
  id: string;
  name: string;
  summary: string;
  artistIds: string[];
  isPaid: boolean;
  artists: ArtistData[];
};
export type ArtistData = {
  id: number;
  name: string;
  label: string;
  portfolio: string;
  twitter: string;
  instagram: string;
  bio: string;
  images: { pfp: string; banner: string };
  address: `0x${string}`;
};
