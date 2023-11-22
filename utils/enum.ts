export const Status = {
  Available: 0,
  Unavailable: 1,
  Borrowed: 2,
  In_review: 3,
  Expired: 4,
  Retired: 5,
  Other: 6,
};

export const Format = {
  Hardcover: 0,
  Paperback: 1,
  Ebook: 2,
  Magazine: 3,
  Other: 4,
};

export const Condition = {
  Likenew: 0,
  Good: 1,
  Fair: 2,
  Poor: 3,
};

export const Language = {
  English: 0,
  Spanish: 1,
  French: 2,
  Other: 3,
};

export const TransactionStatus = {
  Borrowed: 0,
  Returned: 1,
  Reviewed: 2,
  Other: 3,
};

export function enumObjToFilterItem(enumObj: any) {
  return Object.keys(enumObj).map((key, index) => {
    return {
      value: index,
      name: key,
    };
  });
}

export function enumObjToAutocompleteItem(enumObj: any) {
  return Object.keys(enumObj).map((key, index) => {
    return {
      value: index,
      label: key,
    };
  });
}

export function getEnumKey(enumObj: any, value: number | undefined) {
  return value !== undefined
    ? Object.keys(enumObj)[value]?.replaceAll("_", "-")
    : "";
}
