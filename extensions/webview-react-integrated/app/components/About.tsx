import React, { useState, useCallback, useEffect } from 'react';
import { apiUrl } from '../api';

type UserInfo = {
  name: string;
  gender: string;
  email: string;
};

export const About = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    gender: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(() => {
    setLoading(true);
    fetch(apiUrl)
      .then(res => res.json())
      .then(({ results }) => {
        const user = results[0];
        setLoading(false);
        setUserInfo({
          name: `${user.name.first} ${user.name.last}`,
          gender: user.gender,
          email: user.email,
        });
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '24px',
    color: 'var(--vscode-foreground)',
    borderBottom: '2px solid var(--vscode-focusBorder)',
    paddingBottom: '12px',
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--vscode-editor-background)',
    border: '1px solid var(--vscode-panel-border)',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const userCardStyle: React.CSSProperties = {
    ...cardStyle,
    background: loading 
      ? 'var(--vscode-editor-background)' 
      : 'linear-gradient(135deg, var(--vscode-editor-background) 0%, var(--vscode-sideBar-background) 100%)',
  };

  const buttonStyle: React.CSSProperties = {
    background: 'var(--vscode-button-background)',
    color: 'var(--vscode-button-foreground)',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  };

  const loadingStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    color: 'var(--vscode-descriptionForeground)',
    fontSize: '16px',
  };

  const userInfoStyle: React.CSSProperties = {
    display: 'grid',
    gap: '16px',
    marginBottom: '20px',
  };

  const userFieldStyle: React.CSSProperties = {
    background: 'var(--vscode-input-background)',
    border: '1px solid var(--vscode-input-border)',
    borderRadius: '6px',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const labelStyle: React.CSSProperties = {
    color: 'var(--vscode-descriptionForeground)',
    fontSize: '13px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const valueStyle: React.CSSProperties = {
    color: 'var(--vscode-foreground)',
    fontSize: '14px',
    fontWeight: '500',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>📋 About Extension</h1>
      
      <div style={cardStyle}>
        <h2 style={{ marginTop: 0, color: 'var(--vscode-foreground)', fontSize: '1.3rem', marginBottom: '16px' }}>
          🔧 Extension Details
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={userFieldStyle}>
            <span style={labelStyle}>Name</span>
            <span style={valueStyle}>React Webview Extension</span>
          </div>
          <div style={userFieldStyle}>
            <span style={labelStyle}>Version</span>
            <span style={valueStyle}>1.0.0</span>
          </div>
          <div style={userFieldStyle}>
            <span style={labelStyle}>Publisher</span>
            <span style={valueStyle}>VSCode</span>
          </div>
          <div style={userFieldStyle}>
            <span style={labelStyle}>Technology</span>
            <span style={valueStyle}>React + TypeScript + Webpack</span>
          </div>
        </div>
      </div>

      <div style={userCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, color: 'var(--vscode-foreground)' }}>
            👤 Random User Data
          </h3>
          <button 
            style={buttonStyle}
            onClick={fetchUser}
            disabled={loading}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'var(--vscode-button-hoverBackground)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'var(--vscode-button-background)';
              }
            }}
          >
            {loading ? '🔄 Loading...' : '🎲 Fetch New User'}
          </button>
        </div>

        {loading ? (
          <div style={loadingStyle}>
            <div style={{ 
              animation: 'spin 1s linear infinite',
              fontSize: '24px',
              marginRight: '12px'
            }}>
              ⏳
            </div>
            Fetching user data...
          </div>
        ) : (
          <div style={userInfoStyle}>
            <div style={userFieldStyle}>
              <span style={labelStyle}>Full Name</span>
              <span style={valueStyle}>{userInfo.name || 'Not available'}</span>
            </div>
            <div style={userFieldStyle}>
              <span style={labelStyle}>Gender</span>
              <span style={{
                ...valueStyle,
                padding: '4px 8px',
                background: userInfo.gender === 'male' 
                  ? 'var(--vscode-charts-blue)' 
                  : 'var(--vscode-charts-pink)',
                borderRadius: '12px',
                fontSize: '12px',
                textTransform: 'capitalize',
              }}>
                {userInfo.gender || 'Unknown'}
              </span>
            </div>
            <div style={userFieldStyle}>
              <span style={labelStyle}>Email</span>
              <span style={{
                ...valueStyle,
                fontFamily: 'monospace',
                fontSize: '13px',
              }}>
                {userInfo.email || 'Not available'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div style={{
        ...cardStyle,
        background: 'var(--vscode-textBlockQuote-background)',
        borderLeft: '4px solid var(--vscode-charts-orange)',
      }}>
        <h3 style={{ marginTop: 0, color: 'var(--vscode-foreground)', fontSize: '1.1rem' }}>
          🌐 API Integration
        </h3>
        <p style={{ 
          margin: 0, 
          color: 'var(--vscode-descriptionForeground)',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          This component demonstrates API integration within a VSCode extension. 
          It fetches random user data from the <code style={{ 
            background: 'var(--vscode-textPreformat-background)',
            padding: '2px 4px',
            borderRadius: '3px',
            fontSize: '13px'
          }}>randomuser.me</code> API and displays it with proper error handling and loading states.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
