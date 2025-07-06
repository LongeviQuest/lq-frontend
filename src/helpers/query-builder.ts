import { Range } from "../common/components/DatePicker/DateRangePicker";

export interface SearchQuery {
  residenceCountries?: string[];
  isLiving?: boolean;
  gender?: string[];
  status?: string[];
  name?: string;
  birthDateRange?: ValueRange;
  deathDateRange?: ValueRange;
  birthPlaces?: string[];
  deathPlaces?: string[];
  ageRanges?: ValueRange[];
}

interface ValueRange {
  start?: string;
  end?: string;
}

class QueryBuilder {
  private query: SearchQuery = {};

  clear() {
    this.query = {};
    return this;
  }

  withBirthPlace(birthPlaces: string[] | undefined) {
    if (birthPlaces && birthPlaces.length > 0) {
      this.query.birthPlaces = birthPlaces;
    }
    return this;
  }

  withBirthDateRange(birthDateRange: Range | undefined) {
    if (
      birthDateRange &&
      (birthDateRange.startDate || birthDateRange.endDate)
    ) {
      this.query.birthDateRange = {
        start: birthDateRange.startDate?.toISOString(),
        end: birthDateRange.endDate?.toISOString(),
      };
    }
    return this;
  }

  withDeathDateRange(deathDateRange: Range | undefined) {
    if (
      deathDateRange &&
      (deathDateRange.startDate || deathDateRange.endDate)
    ) {
      this.query.deathDateRange = {
        start: deathDateRange.startDate?.toISOString(),
        end: deathDateRange.endDate?.toISOString(),
      };
    }
    return this;
  }

  withGender(gender: string[] | undefined) {
    if (gender && gender.length > 0) {
      this.query.gender = gender;
    }
    return this;
  }

  widthAge(ageRanges: string[] | undefined) {
    if (ageRanges && ageRanges.length > 0) {
      this.query.ageRanges = [];
      ageRanges.forEach((range) => {
        this.query.ageRanges?.push({
          start: JSON.parse(range)[0],
          end: JSON.parse(range)[1],
        });
      });
    }
    return this;
  }

  withStatus(status?: string[]) {
    if (status && status.length > 0) {
      this.query.status = status;
    }
    return this;
  }

  isLiving(isLiving: boolean) {
    this.query.isLiving = isLiving;
    return this;
  }

  withDeathPlace(deathPlaces: string[] | undefined) {
    if (deathPlaces && deathPlaces.length > 0) {
      this.query.deathPlaces = deathPlaces;
    }
    return this;
  }

  withCurrentResidencePlace(residenceCountries: string[] | undefined) {
    if (residenceCountries && residenceCountries.length > 0) {
      this.query.residenceCountries = residenceCountries;
    }
    return this;
  }

  public withName(name?: string) {
    if (name) {
      this.query.name = name;
    }
    return this;
  }

  public build() {
    return this.query;
  }
}
export const queryBuilder = new QueryBuilder();
