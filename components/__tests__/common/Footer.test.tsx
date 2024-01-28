import { render, screen } from '@testing-library/react';
import Footer from '@/components/common/Footer';

describe('Footer', () => {
  it('renders footer text correctly', () => {
    render(<Footer />);
    const footerText = screen.getByText('Footer text');
    expect(footerText).toBeInTheDocument();
  });

  it('renders clickable social media icons', () => {
    render(<Footer />);
    const linkedinIcon = screen.getByLabelText('LinkedIn');
    const githubIcon = screen.getByLabelText('GitHub');
    const twitterIcon = screen.getByLabelText('Twitter');

    expect(linkedinIcon).toBeInTheDocument();
    expect(githubIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();

    expect(linkedinIcon.closest('a')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/',
    );
    expect(githubIcon.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/',
    );
    expect(twitterIcon.closest('a')).toHaveAttribute(
      'href',
      'https://twitter.com/',
    );
  });
});
