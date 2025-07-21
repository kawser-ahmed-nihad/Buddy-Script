import React from 'react';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AdminReportsPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['adminReports'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/reports');
      return res.data;
    }
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/api/reports/${id}`, { status });
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries(['adminReports']);
      Swal.fire({
        icon: 'success',
        title: `Action: ${status}`,
        text: `Report status updated to "${status}".`,
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update status.', 'error');
    }
  });

  const handleAction = (id, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You want to mark this report as "${status}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({ id, status });
      }
    });
  };

  if (isLoading) return <p className="text-center">Loading Reports...</p>;

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Reported Comments</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Reported By</th>
              <th>Commenter</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report.email}</td>
                <td>{report.commenterEmail}</td>
                <td>{report.commentText?.slice(0, 30)}...</td>
                <td>{report.feedback}</td>
                <td>
                  <span className={`badge badge-${getBadgeColor(report.status || 'pending')}`}>
                    {report.status || 'pending'}
                  </span>
                </td>
                <td className="space-x-1">
                  <button className="btn btn-xs btn-info" onClick={() => handleAction(report._id, 'ignored')}>
                    Ignore
                  </button>
                  <button className="btn btn-xs btn-warning" onClick={() => handleAction(report._id, 'warned')}>
                    Warn
                  </button>
                  <button className="btn btn-xs btn-error" onClick={() => handleAction(report._id, 'deleted')}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getBadgeColor = (status) => {
  switch (status) {
    case 'pending': return 'neutral';
    case 'ignored': return 'info';
    case 'warned': return 'warning';
    case 'deleted': return 'error';
    default: return 'default';
  }
};

export default AdminReportsPage;
