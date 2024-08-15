import type { Recordable } from 'shared/lib/types/app/app';

export function getLocaleModules(messages: Recordable) {
  const exportMessages: Recordable = {};

  Object.keys(messages).forEach((messageKey) => {
    exportMessages[messageKey.slice(2, (messageKey.length - 3))] = messages[messageKey].default;
  });

  return exportMessages;
}
