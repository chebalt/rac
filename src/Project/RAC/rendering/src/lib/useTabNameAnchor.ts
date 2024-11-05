export const useTabNameAnchor = (tabs: { id: number; label: string }[]) => {
  const getInitialTab = (): number => {
    if (typeof window === 'undefined') {
      return 0;
    }

    try {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const tabIndex = tabs.findIndex(
        (tab) => tab.label.toLowerCase().replace(/\s+/g, '-') === hash
      );
      return tabIndex >= 0 ? tabIndex : 0;
    } catch {
      return 0;
    }
  };

  return { getInitialTab };
};
