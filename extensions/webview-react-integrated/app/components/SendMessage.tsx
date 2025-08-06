import React, { useState } from 'react';
import { CommonMessage } from '../../src/view/messages/messageTypes';

export const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (status === 'sent' || status === 'error') {
      setStatus('idle');
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setStatus('sending');
    try {
      vscode.postMessage<CommonMessage>({
        type: 'COMMON',
        payload: message,
      });
      setStatus('sent');
      setMessage('');
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px',
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--vscode-editor-background)',
    border: '1px solid var(--vscode-panel-border)',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '20px',
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  };

  const labelStyle: React.CSSProperties = {
    color: 'var(--vscode-foreground)',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
  };

  const inputStyle: React.CSSProperties = {
    background: 'var(--vscode-input-background)',
    border: '1px solid var(--vscode-input-border)',
    borderRadius: '4px',
    padding: '12px 16px',
    color: 'var(--vscode-input-foreground)',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const buttonStyle: React.CSSProperties = {
    background: status === 'sending' 
      ? 'var(--vscode-button-secondaryBackground)' 
      : 'var(--vscode-button-background)',
    color: 'var(--vscode-button-foreground)',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: status === 'sending' || !message.trim() ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    opacity: !message.trim() ? 0.6 : 1,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const statusStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
  };

  const getStatusStyle = () => {
    switch (status) {
      case 'sending':
        return {
          ...statusStyle,
          background: 'var(--vscode-inputValidation-warningBackground)',
          color: 'var(--vscode-inputValidation-warningForeground)',
          border: '1px solid var(--vscode-inputValidation-warningBorder)',
        };
      case 'sent':
        return {
          ...statusStyle,
          background: 'var(--vscode-inputValidation-infoBackground)',
          color: 'var(--vscode-inputValidation-infoForeground)',
          border: '1px solid var(--vscode-inputValidation-infoBorder)',
        };
      case 'error':
        return {
          ...statusStyle,
          background: 'var(--vscode-inputValidation-errorBackground)',
          color: 'var(--vscode-inputValidation-errorForeground)',
          border: '1px solid var(--vscode-inputValidation-errorBorder)',
        };
      default:
        return { display: 'none' };
    }
  };

  const quickMessagesStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '16px',
  };

  const quickButtonStyle: React.CSSProperties = {
    background: 'var(--vscode-button-secondaryBackground)',
    color: 'var(--vscode-button-foreground)',
    border: '1px solid var(--vscode-button-border)',
    padding: '6px 12px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '400',
    transition: 'all 0.2s ease',
  };

  const quickMessages = [
    '👋 Hello Extension!',
    '🚀 Test Message',
    '📊 Request Status',
    '🔧 Debug Info',
    '💡 Feature Request'
  ];

  const handleQuickMessage = (quickMsg: string) => {
    setMessage(quickMsg);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3 style={{ 
          marginTop: 0, 
          color: 'var(--vscode-foreground)', 
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          📤 Send Message to Extension
        </h3>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Message Content</label>
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Press Enter to send)"
            style={{
              ...inputStyle,
              borderColor: message.trim() 
                ? 'var(--vscode-focusBorder)' 
                : 'var(--vscode-input-border)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--vscode-focusBorder)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = message.trim() 
                ? 'var(--vscode-focusBorder)' 
                : 'var(--vscode-input-border)';
            }}
          />
          
          <button
            onClick={sendMessage}
            disabled={status === 'sending' || !message.trim()}
            style={buttonStyle}
            onMouseOver={(e) => {
              if (message.trim() && status !== 'sending') {
                e.currentTarget.style.background = 'var(--vscode-button-hoverBackground)';
              }
            }}
            onMouseOut={(e) => {
              if (message.trim() && status !== 'sending') {
                e.currentTarget.style.background = 'var(--vscode-button-background)';
              }
            }}
          >
            {status === 'sending' ? (
              <>
                <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                Sending...
              </>
            ) : (
              <>
                <span>📨</span>
                Send Message
              </>
            )}
          </button>
        </div>

        <div style={getStatusStyle()}>
          {status === 'sending' && (
            <>
              <span>🔄</span>
              Sending message to extension...
            </>
          )}
          {status === 'sent' && (
            <>
              <span>✅</span>
              Message sent successfully! Check VSCode notifications.
            </>
          )}
          {status === 'error' && (
            <>
              <span>❌</span>
              Failed to send message. Please try again.
            </>
          )}
        </div>

        <div>
          <h4 style={{ 
            color: 'var(--vscode-foreground)', 
            fontSize: '13px',
            marginBottom: '8px',
            marginTop: '20px'
          }}>
            Quick Messages
          </h4>
          <div style={quickMessagesStyle}>
            {quickMessages.map((quickMsg, index) => (
              <button
                key={index}
                onClick={() => handleQuickMessage(quickMsg)}
                style={quickButtonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--vscode-button-hoverBackground)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--vscode-button-secondaryBackground)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {quickMsg}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        ...cardStyle,
        background: 'var(--vscode-textBlockQuote-background)',
        borderLeft: '4px solid var(--vscode-focusBorder)',
      }}>
        <h4 style={{ marginTop: 0, color: 'var(--vscode-foreground)', fontSize: '14px' }}>
          💡 How it works
        </h4>
        <p style={{ 
          margin: 0, 
          color: 'var(--vscode-descriptionForeground)',
          fontSize: '13px',
          lineHeight: '1.5'
        }}>
          Messages sent from this webview are received by the VSCode extension and displayed 
          as information notifications. This demonstrates bidirectional communication between 
          the webview and extension host.
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
