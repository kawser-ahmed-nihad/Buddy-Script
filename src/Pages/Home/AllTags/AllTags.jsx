import { useQuery } from '@tanstack/react-query';
import { data } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const AllTags = ({ selectedTag, setSelectedTag }) => {
    const axiosSecure = useAxios();

    const fetchTags = async () => {
        const res = await axiosSecure.get('/api/tags');
        return res.data;
    };

    const { data: tags = [], isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
    });


    // if (isLoading) return <p className='px-10'>Loading tags...</p>;

    return (
        <div className="flex flex-wrap max-w-7xl mx-auto px-4 md:px-0 gap-3 mt-24">
            {tags.map((tag, index) => (
                <button
                    key={tag._id || tag.tagName || index}
                    onClick={() =>
                        setSelectedTag((prev) =>
                            prev === tag.tagName ? null : tag.tagName
                        )
                    }
                    className={`px-4 py-2 rounded-full border border-gray-400 text-sm bg-white shadow-md font-medium transition
                        ${selectedTag === tag.tagName
                            ? "bg-[#f28c6b] text-black"
                            : "bg-gray-100 text-gray-700 hover:bg-[#fbd1c5]"
                        }`}
                >
                    #{tag.tagName}
                </button>

            ))}
        </div>
    );
};

export default AllTags;
