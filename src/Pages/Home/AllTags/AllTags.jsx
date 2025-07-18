import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllTags = ({ selectedTag, setSelectedTag }) => {
    const axiosSecure = useAxiosSecure();

    const fetchTags = async () => {
        const res = await axiosSecure.get('/api/tags');
        return res.data;
    };

    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
    });

    if (isLoading) return <p>Loading tags...</p>;

    return (
        <div className="flex flex-wrap max-w-7xl mx-auto gap-3 mt-4">
            {tags.map((tag) => (
                <button
                    key={tag._id}
                    onClick={() =>
                        setSelectedTag((prev) =>
                            prev === tag.tagName ? null : tag.tagName
                        )
                    }
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition
                    ${selectedTag === tag.tagName
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
                >
                    #{tag.tagName}
                </button>
            ))}
        </div>
    );
};

export default AllTags;
