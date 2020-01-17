import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  position: relative;
  border: 0;
  background: none;
  cursor: pointer;

  ${props =>
    props.hasUnread &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ff892c;
      }
    `}
`;

export const NotificationList = styled.div`
  position: absolute;
  top: calc(100% + 30px);
  left: calc(50% - 130px);
  width: 260px;
  padding: 15px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: calc(50% - 20px);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.6);
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #fff;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  p {
    line-height: 18px;
    font-size: 13px;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.6;
    margin-bottom: 5px;
  }

  button {
    border: 0;
    font-size: 12px;
    color: ${lighten(0.2, '#7159c1')};
    background: none;
    cursor: pointer;
  }

  ${props =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-left: 10px;
        border-radius: 50%;
        background: #ff892e;
      }
    `}
`;
