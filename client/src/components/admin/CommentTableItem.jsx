import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

function CommentTableItem({ comment, index, fetchComment }) {
    const { axios } = useAppContext();

    const { blog, user, createdAt, _id } = comment;
    const commentDate = new Date(createdAt);

    async function approveComment() {
        try {
            const { data } = await axios.patch(`/comment/${_id}/approve`);
            data.success ? toast.success(data.message) : toast.error(data.message);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            fetchComment();
        }
    }
    
    async function deleteComment() {
        const confirm = window.confirm('Are you sure you want to delete this comment?');
        if(!confirm) return;
        try {
            const { data } = await axios.delete(`/comment/${_id}`);
            data.success ? toast.success(data.message) : toast.error(data.message);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            fetchComment();
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            <td className='px-6 py-4'> { index } </td>
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'> Blog </b> : { blog.title }
                <br /><br />
                <b className='font-medium text-gray-600'> Name </b> : { user.username }
                <br />
                <b className='font-medium text-gray-600'> Comment </b> : { comment.content }
            </td>
            <td className='px-6 py-4 max-sm:hidden'>
                { commentDate.toLocaleDateString() }
            </td>
            <td className='px-6 py-4'>
                <div className='inline-flex items-center gap-4'>
                    {
                        !comment.isApproved ? 
                        <img onClick={approveComment}
                        src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' /> 
                        :
                        <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
                            Approved
                        </p>
                    }
                    <img onClick={deleteComment}
                    src={assets.bin_icon} alt=""
                    className='w-5 hover:scale-110 transition-all cursor-pointer' />
                </div>
            </td>
        </tr>
  )
}

export default CommentTableItem