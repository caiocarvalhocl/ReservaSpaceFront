import { Ban, CircleCheck, Clock, Crown, Shield, Users } from 'lucide-react';
import type { UserInfo } from '../../interfaces/auth/user';
import type { UserCardProps } from '../../interfaces/components';
import { userRolesMap, userStatusMap, type UserRole, type UserStatus } from '../../types/components';
import { USER_COLOR_ROLE_MAP, USER_COLOR_STATUS_MAP } from '../../utils/constants';

const BASE_ICON_CLASSNAME = 'w-5 h-5 sm:w-10 sm:h-10 md:w-8 md:h-8';

export function UserCard({ fields, userInfo, onChangeCheckBox, isSelected }: UserCardProps) {
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
  };

  const renderRoleIcon = (role: UserRole) => {
    if (role === 'admin') return <Crown className={BASE_ICON_CLASSNAME} />;
    if (role === 'manager') return <Shield className={BASE_ICON_CLASSNAME} />;

    return <Users className={BASE_ICON_CLASSNAME} />;
  };

  const renderStatusIcon = (status: UserStatus) => {
    if (status === 'active') return <CircleCheck className={BASE_ICON_CLASSNAME} />;
    if (status === 'suspend') return <Ban className={BASE_ICON_CLASSNAME} />;

    return <Clock className={BASE_ICON_CLASSNAME} />;
  };

  const renderField = (fieldName: string, user: UserInfo) => {
    const value = getNestedValue(user, fieldName);

    switch (fieldName) {
      case 'role':
        return (
          <div className={`px-3 py-1 rounded-full flex gap-1 items-center ${USER_COLOR_ROLE_MAP[value]}`}>
            {renderRoleIcon(value)}
            <h4 className='capitalize text-lg md:texl-xl'>{userRolesMap[value as keyof typeof userRolesMap] || value}</h4>
          </div>
        );
      case 'status':
        return (
          <div className={`px-3 py-1 rounded-full flex gap-1 items-center ${USER_COLOR_STATUS_MAP[value]}`}>
            {renderStatusIcon(value)}
            <h4 className='capitalize text-lg md:texl-xl'>{userStatusMap[value as keyof typeof userStatusMap] || value}</h4>
          </div>
        );
      case 'userInfo':
        return (
          <div className='flex flex-col items-center text-center'>
            <h4 className='text-base font-semibold sm:text-lg lg:text-xl'>{userInfo.name}</h4>
            <h5 className='text-sm text-gray-500 sm:text-base lg:text-lg'>{userInfo.email}</h5>
          </div>
        );

      default:
        return <div>{value !== null ? String(value) : '-'}</div>;
    }
  };

  return (
    <div className='contents' style={{ gridColumn: `span ${fields.length + 1}` }}>
      <div className='grid-cols-subgrid p-4 flex items-center justify-center'>
        <input type='checkbox' className='w-5 h-5' checked={isSelected} onChange={e => onChangeCheckBox(userInfo.id, e.target.checked)} />
      </div>
      {fields.map((fieldName, index) => (
        <div key={fieldName + index} className='grid-cols-subgrid p-4 flex items-center justify-center'>
          {renderField(fieldName, userInfo)}
        </div>
      ))}
    </div>
  );
}
