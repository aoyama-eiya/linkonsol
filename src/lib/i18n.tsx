"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ja' | 'ko' | 'zh';

type Translations = {
    [key in Language]: {
        // Editor UI
        profile: string;
        links: string;
        design: string;
        share: string;
        profileImage: string;
        uploadImage: string;
        displayName: string;
        bio: string;
        walletAddress: string;
        enterWalletPlaceholder: string;
        useConnected: string;
        addNewLink: string;
        linkTitle: string;
        linkUrlPlaceholder: string;
        readyToLaunch: string;
        readyMessage: string;
        shareProfile: string;
        copied: string;
        poweredBy: string;

        // Fallbacks
        yourName: string;
        bioPlaceholder: string;

        // Interface
        preview: string;
        edit: string;
        tools: string;

        // Footer / CTA
        ctaTitle: string;
        ctaButton: string;
        copyright: string;

        // Settings
        walletConnection: string;
        connectWalletMsg: string;
        syncWalletBtn: string;
    }
};

const translations: Translations = {
    en: {
        profile: 'Profile',
        links: 'Links',
        design: 'Design',
        share: 'Share',
        profileImage: 'Profile Image',
        uploadImage: 'Upload Image',
        displayName: 'Display Name',
        bio: 'Bio',
        walletAddress: 'Solana Wallet Address (Optional)',
        enterWalletPlaceholder: 'Enter SOL address',
        useConnected: 'Use Connected',
        addNewLink: 'Add New Link',
        linkTitle: 'Link Title',
        linkUrlPlaceholder: 'https://...',
        readyToLaunch: 'Ready to Launch?',
        readyMessage: 'Your profile is ready to be shared with the world. Click the button below to get your unique link.',
        shareProfile: 'Share',
        copied: 'Copied',
        poweredBy: 'Powered by',
        yourName: 'Your Name',
        bioPlaceholder: 'Tell your story...',
        preview: 'Preview',
        edit: 'Edit',
        tools: 'Tools',
        ctaTitle: 'Create your own Link On Sol',
        ctaButton: 'Get Started',
        copyright: '© 2026 com.oonanji',
        walletConnection: 'Wallet Connection',
        connectWalletMsg: 'Connect a wallet to show your address on your profile.',
        syncWalletBtn: 'Sync Connected Wallet Address to Profile',
    },
    ja: {
        profile: 'プロフィール',
        links: 'リンク',
        design: 'デザイン',
        share: '共有',
        profileImage: 'プロフィール画像',
        uploadImage: '画像アップロード',
        displayName: '表示名',
        bio: '自己紹介',
        walletAddress: 'Solanaウォレットアドレス（任意）',
        enterWalletPlaceholder: 'SOLアドレスを入力',
        useConnected: '接続中のウォレットを使用',
        addNewLink: 'リンクを追加',
        linkTitle: 'タイトル',
        linkUrlPlaceholder: 'https://...',
        readyToLaunch: '公開準備完了',
        readyMessage: 'あなたのプロフィールを世界に公開しましょう。下のボタンをクリックしてリンクを取得してください。',
        shareProfile: '共有',
        copied: 'コピー完了',
        poweredBy: 'Powered by',
        yourName: '名前を入力',
        bioPlaceholder: 'あなたのストーリーを伝えましょう...',
        preview: 'プレビュー',
        edit: '編集',
        tools: 'ツール',
        ctaTitle: 'Link On Solでポートフォリオを作ろう！',
        ctaButton: 'はじめる',
        copyright: '© 2026 com.oonanji',
        walletConnection: 'ウォレット接続',
        connectWalletMsg: 'ウォレットを接続すると、プロフィールにアドレスを表示できます。',
        syncWalletBtn: '接続中のウォレットをプロフィールに反映',
    },
    ko: {
        profile: '프로필',
        links: '링크',
        design: '디자인',
        share: '공유',
        profileImage: '프로필 이미지',
        uploadImage: '이미지 업로드',
        displayName: '이름',
        bio: '소개',
        walletAddress: 'Solana 지갑 주소 (선택)',
        enterWalletPlaceholder: 'SOL 주소 입력',
        useConnected: '연결된 지갑 사용',
        addNewLink: '새 링크 추가',
        linkTitle: '링크 제목',
        linkUrlPlaceholder: 'https://...',
        readyToLaunch: '출시 준비 완료',
        readyMessage: '프로필을 공유할 준비가 되었습니다. 아래 버튼을 클릭하여 링크를 복사하세요.',
        shareProfile: '공유',
        copied: '복사됨',
        poweredBy: 'Powered by',
        yourName: '이름',
        bioPlaceholder: '자기소개를 입력하세요...',
        preview: '미리보기',
        edit: '편집',
        tools: '도구',
        ctaTitle: 'Link On Sol로 포트폴리오 만들기',
        ctaButton: '시작하기',
        copyright: '© 2026 com.oonanji',
        walletConnection: '지갑 연결',
        connectWalletMsg: '지갑을 연결하여 프로필에 주소를 표시하세요.',
        syncWalletBtn: '연결된 지갑 주소를 프로필에 동기화',
    },
    zh: {
        profile: '个人资料',
        links: '链接',
        design: '设计',
        share: '分享',
        profileImage: '头像',
        uploadImage: '上传图片',
        displayName: '显示名称',
        bio: '简介',
        walletAddress: 'Solana 钱包地址（可选）',
        enterWalletPlaceholder: '输入 SOL 地址',
        useConnected: '使用已连接钱包',
        addNewLink: '添加新链接',
        linkTitle: '链接标题',
        linkUrlPlaceholder: 'https://...',
        readyToLaunch: '准备发布？',
        readyMessage: '您的个人资料已准备好与世界分享。点击下方按钮获取您的专属链接。',
        shareProfile: '分享',
        copied: '已复制',
        poweredBy: 'Powered by',
        yourName: '您的名字',
        bioPlaceholder: '讲述您的故事...',
        preview: '预览',
        edit: '编辑',
        tools: '工具',
        ctaTitle: '创建您的 Link On Sol',
        ctaButton: '开始',
        copyright: '© 2026 com.oonanji',
        walletConnection: '钱包连接',
        connectWalletMsg: '连接钱包以在您的个人资料上显示地址。',
        syncWalletBtn: '将连接的钱包地址同步到个人资料',
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    // Simple browser detection
    useEffect(() => {
        const browserLang = navigator.language.split('-')[0];
        if (['ja', 'ko', 'zh'].includes(browserLang)) {
            setLanguage(browserLang as Language);
        }
    }, []);

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
