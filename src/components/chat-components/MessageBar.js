import { Button } from 'reactstrap';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { getItemFromStorage, socket } from '../../utils/helper';

const MessageBar = () => {
  const [value, setValue] = useState('');
  const { name } = getItemFromStorage('user');
  const [sendMessage, setSendMessage] = useState(false);

  const getAIResponse = async (inputText) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'gpt-3.5-turbo', // 模型选择
          prompt: inputText, // 输入文本
          max_tokens: 50, // 最大回复长度
        },
        {
          headers: {
            Authorization:
              'Bearer sk-proj-KlY2gB2VXh0kaVDOwuncT3BlbkFJadZaGbIpJitBSZRwtr5G',
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0].text.trim(); // 返回 AI 生成的回复文本
    } catch (error) {
      // console.error('Error fetching AI response:', error);
      // eslint-disable-next-line max-len
      return '机器人已调用openAI回复服务，调用基准为20秒未回复，但由于当前配额不足，导致服务不可用，详见代码文件src/components/chat-components/MessageBar.js';
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!sendMessage) {
        socket.emit('NEW_MESSAGE', {
          userName: `robot-for-${name}`,
          msg: await getAIResponse(JSON.stringify('give me some robot msg')),
        });
      }
      clearTimeout(timer);
    }, 20000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendMessage]);

  // On Submitting the message/form
  const handleSubmit = useCallback(
    (msg) => {
      setValue('');
      // Trigger NEW_MESSAGE with object
      // this object contains userName, msg
      socket.emit('NEW_MESSAGE', { userName: name, msg });
      setSendMessage(true);
      setTimeout(() => {
        setSendMessage(false);
      }, 20000);
    },
    [name],
  );

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyUp = (e) => {
    if ((e.key === 'Enter' || e.keyCode === 13) && value.trim().length > 0) {
      handleSubmit(value);
    }
  };

  return (
    <div className="w-50 message-bar d-flex">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="输入消息，敲击回车发送"
        required
      />
      <Button
        className="ml-2"
        color="success"
        disabled={!value.trim().length}
        onClick={() => handleSubmit(value)}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </div>
  );
};

export default MessageBar;
