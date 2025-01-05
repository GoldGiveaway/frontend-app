declare global {
    interface Window {
        Telegram: {
            WebApp: {
                MainButton: {
                    show: () => void;
                    hide: () => void;
                    text: string;
                    onClick: (e) => void;
                    color: string;
                    setText: (text: string) => void;
                };
                initData: string;
                close: () => void;
            };
        };
    }
}

export {};
