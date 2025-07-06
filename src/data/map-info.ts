export interface MapInfo {
  content: Supercentenarian[];
  count: number;
  panelInfo?: string;
  url?: string;
  showDetails?: boolean;
  hideCaptions?: boolean;
  isAboutGeography?: boolean;
  isLoaded?: boolean;
  hideCount?: boolean;
  showValidationDate?: boolean;
}

export interface MapDataInfo {
  data?: Supercentenarian[];
}

export interface BaseStructure {
  _id: string;
  post_id: string;
  sc_validated: string;
  nationality: string;
  name: string;
  lastname: string;
  link: string;
  birth: Date;
  birth_place_country: string;
  birth_place_city: string;
  birth_place: string;
  residence_country: string;
  residence_city: string;
  residence: string;
  photo: string;
  sex: string;
  gender: string;
  is_dead: string;
  date_of_death: Date;
  death_place_country: string;
  death_place_city: string;
  death_place: string;
  personal_information: string;
  biography_0_paragraph: string;
  biography_1_paragraph: string;
  biography_2_paragraph: string;
  biography_3_paragraph: string;
  ageInMilliseconds: number;
  ageInYears: number;
  roundedAgeInYears: number;
  //Taxonomy
  taxonomy_MilitaryService?: string;
  taxonomy_Marriage?: string;
  taxonomy_Issue?: string;
  taxonomy_Family?: string;
  taxonomy_SelfExpression?: string;
  taxonomy_HabitVices?: string;
  taxonomy_CauseOfDeath?: string;
}

export interface Supercentenarian {
  _id: string;
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Title;
  content: ContentClass;
  parent: number;
  template: string;
  yoast_head: string;
  yoast_head_json: YoastHeadJson;
  acf: Acf;
  ageInMilliseconds: number;
  roundedAgeInYears: number;
  _links: Links;
  time_components?: TimeComponents;
  total_milliseconds?: number;
}

interface TimeComponents {
  years: number;
  days: number;
}
interface Acf {
  sc_validated: boolean;
  personal_information: PersonalInformation;
  time_zones: TimeZones;
  biography: Biography[];
  recognition: Biography[];
  gallery_section: GallerySection[];
  validation_information: ValidationInformation;
  attribution: boolean;
}

interface TimeZoneInfo {
  timeZoneId: string;
}
interface TimeZones {
  birth_place: TimeZoneInfo;
  residence?: TimeZoneInfo;
  death_place?: TimeZoneInfo;
}
interface Biography {
  paragraph: string;
}
interface GallerySection {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: { [key: string]: string | number };
}
interface PersonalInformation {
  nationality: Nationality;
  name: string;
  lastname: string;
  birth: string;
  birth_place: BirthPlace;
  residence: BirthPlace;
  photo: string;
  sex: Nationality;
  race: Race;
  is_dead: boolean;
  date_of_death: string;
  death_place: BirthPlace;
}
interface BirthPlace {
  country: Nationality;
  city: string;
}
interface Nationality {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
}
interface Race {
  errors: Errors;
  error_data: any[];
}
interface Errors {
  invalid_taxonomy: string[];
}
interface ValidationInformation {
  researcher: Researcher[];
  validation_date: string;
}
interface Researcher {
  validator: boolean;
}
interface ContentClass {
  rendered: string;
  protected: boolean;
}
interface Guid {
  rendered: string;
}
interface Links {
  self: Href[];
  collection: Href[];
  about: Href[];
  'wp:attachment': Href[];
  'wp:term': WpTerm[];
  curies: Cury[];
}
interface Href {
  href: string;
}
interface Cury {
  name: string;
  href: string;
  templated: boolean;
}
interface WpTerm {
  taxonomy: string;
  embeddable: boolean;
  href: string;
}
interface Title {
  rendered: string;
}
interface YoastHeadJson {
  title: string;
  description: string;
  robots: Robots;
  canonical: string;
  og_locale: string;
  og_type: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_site_name: string;
  article_modified_time: string;
  twitter_card: string;
  twitter_misc: { [key: string]: string };
  schema: Schema;
}
interface Robots {
  index: string;
  follow: string;
  'max-snippet': string;
  'max-image-preview': string;
  'max-video-preview': string;
}
interface Schema {
  '@context': string;
  '@graph': Graph[];
}
interface Graph {
  '@type': string;
  '@id': string;
  url?: string;
  name?: string;
  isPartOf?: IsPartOf;
  datePublished?: string;
  dateModified?: string;
  description?: string;
  breadcrumb?: IsPartOf;
  inLanguage?: string;
  potentialAction?: PotentialAction[];
  itemListElement?: ItemListElement[];
  publisher?: IsPartOf;
  logo?: Logo;
  image?: IsPartOf;
}
interface IsPartOf {
  '@id': string;
}
interface ItemListElement {
  '@type': string;
  position: number;
  name: string;
  item: string;
}
interface Logo {
  '@type': string;
  inLanguage: string;
  '@id': string;
  url: string;
  contentUrl: string;
  width: number;
  height: number;
  caption: string;
}
interface PotentialAction {
  '@type': string;
  target: string[];
}
