# Recanto e Sabor

Recanto e Sabor is a website for a local restaurant in Balneário Camboriú, created especially for my brother Alexander. The website provides an attractive and functional presentation of the restaurant, focusing on a buffet by weight and a variety of dishes, bringing the essence and flavor of local cuisine.

## 🌟 About Recanto e Sabor

This project was developed to highlight the delicious buffet and variety of dishes offered by Recanto e Sabor, providing a simple, elegant, and responsive digital experience for customers!!

## 🛠️ Technologies Used

- **Astro**: A framework for building fast, content-focused websites.
- **TailwindCSS**: A utility-first CSS framework for rapid, stylish development.
- **Alpine.js**: A lightweight JavaScript library for interactivity.
- **Swiper**: A library for responsive sliders.
- **GLightbox**: A lightbox for displaying images and videos with elegance.

## 🚀 How to Use

1. **Clone the project**:

    ```sh
    git clone https://github.com/yourusername/recanto-e-sabor.git
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Run the development server**:

    ```sh
    npm run dev
    ```

4. **Build for production**:

    ```sh
    npm run build
    ```

## 📂 Project Structure

Inside of your recantoesabor project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about-us.astro
│   │   ├── gallery.astro
│   │   ├── contact.astro
│   └── styles/
└── package.json
```

## 📄 Premade Pages

-   Home: index.astro
-   About Us: about-us.astro
-   Gallery: gallery.astro
-   Contact: contact.astro

## 🧩 Available Components

-   Article: Article.astro
-   Badge: Badge.astro
-   Button: Button.astro
-   ButtonCallUs: ButtonCallUs.astro
-   Card: Card.astro
-   Footer: Footer.astro
-   FormBook: FormBook.astro
-   FormContact: FormContact.astro
-   Grid: Grid.astro
-   Header: Header.astro
-   Heading: Heading.astro
-   Hero: Hero.astro
-   Menu: Menu.astro
-   ReviewSlider: ReviewSlider.astro
-   Section: Section.astro
-   WideImage: WideImage.astro

## 📚 Component Documentation

### Article

A component for displaying articles.

```astro
<Article contain={true}>
  <h1>Title</h1>
  <p>Content goes here...</p>
</Article>
```

### Badge

A component for displaying badges.

```astro
<Badge color="green" title="New" />
```

### Button

A component for displaying buttons.

```astro
<Button color="green" url="/contact">Contact Us</Button>
```

### ButtonCallUs

A component for displaying a call-to-action button.

```astro
<ButtonCallUs />
```

### Card

A component for displaying cards.

```astro
<Card>
  <h2>Card Title</h2>
  <p>Card content goes here...</p>
</Card>
```

### Footer

A component for displaying the footer.

```astro
<Footer />
```

### FormBook

A component for displaying a booking form.

```astro
<FormBook />
```

### FormContact

A component for displaying a contact form.

```astro
<FormContact />
```

### Grid

A component for displaying a grid layout.

```astro
<Grid>
  <div slot="grid-content-1">Content 1</div>
  <div slot="grid-content-2">Content 2</div>
  <div slot="grid-content-3">Content 3</div>
</Grid>
```

### Header

A component for displaying the header.

```astro
<Header />
```

### Heading

A component for displaying headings.

```astro
<Heading>
  <h1 slot="heading-title">Title</h1>
  <p slot="heading-content">Content goes here...</p>
</Heading>
```

### Hero

A component for displaying the hero section.

```astro
<Hero>
  <div slot="hero-content-left">Left Content</div>
  <div slot="hero-content-right">Right Content</div>
</Hero>
```

### Menu

A component for displaying a menu.

```astro
<Menu />
```

### ReviewSlider

A component for displaying a review slider.

```astro
<ReviewSlider />
```

### Section

A component for displaying a section.

```astro
<Section>
  <p>Section content goes here...</p>
</Section>
```

### WideImage

A component for displaying a wide image.

```astro
<WideImage src={importedImage} alt="alt description" />
```
