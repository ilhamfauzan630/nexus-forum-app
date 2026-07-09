import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';

import CommentsList from '../components/CommentsList';

import {
  asyncReceiveThreadDetail,
  clearThreadDetailActionCreator,
  asyncAddComment,
} from '../states/threadDetail/action';

import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from '../states/shared/action';


function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));

    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [id, dispatch]);

  function onUpVoteThread(threadId) {
    dispatch(asyncUpVoteThread(threadId));
  }

  function onDownVoteThread(threadId) {
    dispatch(asyncDownVoteThread(threadId));
  }

  function onNeutralVoteThread(threadId) {
    dispatch(asyncNeutralVoteThread(threadId));
  }

  function onUpVoteComment(commentId) {
    dispatch(asyncUpVoteComment({
      threadId: id,
      commentId,
    }));
  }

  function onDownVoteComment(commentId) {
    dispatch(asyncDownVoteComment({
      threadId: id,
      commentId,
    }));
  }

  function onNeutralVoteComment(commentId) {
    dispatch(asyncNeutralVoteComment({
      threadId: id,
      commentId,
    }));
  }

  function onAddComment(content) {
    dispatch(asyncAddComment({
      threadId: id,
      content,
    }));
  }

  if (!threadDetail || !authUser) {
    return null;
  }

  return (
    <section className="detail-page">
      <ThreadDetail
        {...threadDetail}
        authUser={authUser.id}
        upVoteThread={onUpVoteThread}
        downVoteThread={onDownVoteThread}
        neutralVoteThread={onNeutralVoteThread}
      />

      <CommentInput
        addComment={onAddComment}
      />
      <CommentsList
        comments={threadDetail.comments}
        authUser={authUser.id}
        upVoteComment={onUpVoteComment}
        downVoteComment={onDownVoteComment}
        neutralVoteComment={onNeutralVoteComment}
      />
    </section>
  );
}

export default DetailPage;