export const ICON_BASE_CLASSNAME = 'w-10 h-10 sm:w-12 sm:h-12 md:w-8 md:h-8';

export const SPACE_COLOR_STATUS_MAP: Record<string, string> = {
  active: 'bg-green-200 text-green-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-gray-100 text-black',
};

export const USER_COLOR_STATUS_MAP: Record<string, string> = {
  active: 'bg-green-200 text-green-800',
  suspend: 'bg-red-100 text-red-800',
  inactive: 'bg-gray-100 text-black',
};

export const USER_COLOR_ROLE_MAP: Record<string, string> = {
  admin: 'bg-red-200 text-red-800',
  manager: 'bg-blue-100 text-blue-800',
  regular: 'bg-gray-100 text-black',
};
