import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';


const InstagramSection = ({
  title = 'Follow Us @ROXVORA',
  subtitle = 'Tag us for a chance to be featured',
  posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80', likes: 1234, comments: 56 },
    { id: 2, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80', likes: 987, comments: 34 },
    { id: 3, image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80', likes: 2156, comments: 89 },
    { id: 4, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80', likes: 876, comments: 23 },
    { id: 5, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80', likes: 1543, comments: 67 },
    { id: 6, image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80', likes: 654, comments: 12 },
  ],
  className = '',
}) => {
  return (
    <section className={`py-16 md:py-24 bg-neutral-50 ${className}`} aria-labelledby="instagram-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-secondary-700 mb-3">
            <FiInstagram className="w-4 h-4" aria-hidden="true" />
            Instagram
          </span>
          <h2 id="instagram-heading" className="text-3xl md:text-4xl font-secondary font-semibold text-primary mb-4">
            {title}
          </h2>
          <p className="text-secondary text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
              className="relative aspect-square overflow-hidden rounded-xl group"
            >
              <a
                href={`https://instagram.com/p/${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full w-full"
                aria-label={`Instagram post with ${post.likes} likes`}
              >
                <img
                  src={post.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/70 transition-colors duration-300"
                  aria-hidden="true"
                />
                <span className="absolute inset-0 flex items-center justify-center gap-6 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-center">
                    <span className="block text-xl font-secondary font-semibold">
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="block text-xs text-white/70">Likes</span>
                  </span>
                  <span className="text-center">
                    <span className="block text-xl font-secondary font-semibold">{post.comments}</span>
                    <span className="block text-xs text-white/70">Comments</span>
                  </span>
                </span>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://instagram.com/roxvora"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg inline-flex items-center gap-2"
          >
            Follow on Instagram
            <FiInstagram className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;