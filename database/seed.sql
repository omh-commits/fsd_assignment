-- ============================================================
-- Leafy Village v2 - sample products
-- Run after schema.sql:
--   mysql -u root -p < database/seed.sql
-- Every image_url points to a file in server/public/images
-- (the images come from the original project's static/images folder).
-- ============================================================

USE leafy_village;

DELETE FROM products;
ALTER TABLE products AUTO_INCREMENT = 1;

INSERT INTO products (product_name, description, price, stock_quantity, category, subcategory, image_url, steps_to_grow) VALUES

-- ---------------- Plants / Indoor ----------------
('Snake Plant', 'Hardy upright plant with yellow-edged leaves. Cleans indoor air and is happy in low light.', 349.00, 25, 'Plants', 'Indoor', '/images/31.jpg',
 '1. Keep in bright, indirect light (low light is fine). 2. Water every 2-3 weeks, only when the soil is completely dry. 3. Use well-draining cactus soil. 4. Feed once a month in spring and summer.'),
('Peace Lily', 'Glossy green leaves and white flowers. It droops when thirsty, so it tells you when to water.', 399.00, 20, 'Plants', 'Indoor', '/images/32.jpg',
 '1. Place in medium, indirect light. 2. Water when the top 2 cm of soil feels dry. 3. Mist the leaves in dry weather. 4. Cut off old flowers to make room for new ones.'),
('Areca Palm', 'Feathery palm that makes any corner look tropical. Great natural humidifier.', 549.00, 15, 'Plants', 'Indoor', '/images/33.jpg',
 '1. Give it bright, filtered light. 2. Keep the soil slightly moist, never soggy. 3. Wipe the leaves monthly. 4. Repot every 2-3 years.'),
('Cast Iron Plant', 'Tough, broad-leaved plant that survives dark rooms and forgetful owners.', 449.00, 12, 'Plants', 'Indoor', '/images/34.jpg',
 '1. Keep away from direct sun. 2. Water when the top half of the soil is dry. 3. Feed twice a year. 4. Remove brown leaves at the base.'),
('Spider Plant', 'Arching striped leaves that grow little baby plants you can replant.', 249.00, 30, 'Plants', 'Indoor', '/images/35.jpg',
 '1. Bright, indirect light. 2. Water once a week. 3. Snip off the babies and plant them in water or soil. 4. Avoid very cold drafts.'),
('Bamboo Palm', 'Tall, slim palm with soft fronds. Perfect for living rooms and offices.', 599.00, 10, 'Plants', 'Indoor', '/images/36.jpg',
 '1. Medium to bright indirect light. 2. Keep soil evenly moist. 3. Feed monthly in summer. 4. Trim yellow fronds at the base.'),
('Aloe Vera', 'Easy succulent with soothing gel inside its thick leaves.', 199.00, 40, 'Plants', 'Indoor', '/images/37.jpg',
 '1. Bright light, a sunny window is ideal. 2. Water every 2-3 weeks. 3. Use sandy, fast-draining soil. 4. Do not let water sit in the pot.'),
('Moonshine Snake Plant', 'Silvery-green version of the classic snake plant. Very low maintenance.', 379.00, 18, 'Plants', 'Indoor', '/images/38.jpg',
 '1. Low to bright indirect light. 2. Water only when the soil is dry. 3. Use a pot with drainage holes. 4. Feed lightly in summer.'),
('Boston Fern', 'Lush, soft fronds that love humidity. Looks great on a stand or shelf.', 299.00, 22, 'Plants', 'Indoor', '/images/39.jpg',
 '1. Bright, indirect light. 2. Keep the soil moist. 3. Mist often or keep near a humid spot. 4. Trim brown fronds.'),
('Flowering Succulent', 'Chunky rosette succulent with small pink star flowers.', 179.00, 35, 'Plants', 'Indoor', '/images/55.jpg',
 '1. Lots of bright light. 2. Water every 10-14 days. 3. Use cactus mix. 4. Let the soil dry fully between waterings.'),
('Philodendron', 'Heart-shaped leaves on a fast-growing, forgiving plant.', 499.00, 14, 'Plants', 'Indoor', '/images/plant-item2.jpg',
 '1. Medium indirect light. 2. Water when the top 3 cm of soil is dry. 3. Give it a moss pole to climb. 4. Feed monthly in the growing season.'),
('Chinese Money Plant', 'Round, coin-shaped leaves on thin stems. Said to bring good luck.', 329.00, 20, 'Plants', 'Indoor', '/images/plant-item4.jpg',
 '1. Bright, indirect light. 2. Water once a week. 3. Turn the pot weekly so it grows straight. 4. Pot up the small offshoots.'),
('Barrel Cactus', 'Round spiky cactus for sunny windowsills.', 229.00, 25, 'Plants', 'Indoor', '/images/plant-item5.jpg',
 '1. Full sun. 2. Water every 3 weeks in summer, monthly in winter. 3. Use cactus soil. 4. Handle with gloves.'),
('Zebra Haworthia', 'Small succulent with white stripes. Perfect for desks.', 199.00, 30, 'Plants', 'Indoor', '/images/plant-item7.jpg',
 '1. Bright, indirect light. 2. Water every 2 weeks. 3. Use gritty soil. 4. Keep away from frost.'),
('Golden Pothos', 'Trailing vine with yellow-splashed leaves. Almost impossible to kill.', 249.00, 28, 'Plants', 'Indoor', '/images/plant-item11.jpg',
 '1. Low to bright indirect light. 2. Water when the soil is half dry. 3. Pinch the tips to make it bushy. 4. Cuttings root easily in water.'),
('Rubber Plant', 'Thick, shiny leaves on a plant that can grow into a small indoor tree.', 449.00, 16, 'Plants', 'Indoor', '/images/plant-item12.jpg',
 '1. Bright, indirect light. 2. Water when the top 3 cm of soil is dry. 3. Wipe dust off the leaves. 4. Prune to control height.'),
('Column Cactus', 'Tall, ribbed cactus that adds height to a plant shelf.', 259.00, 20, 'Plants', 'Indoor', '/images/plant-item13.jpg',
 '1. Full sun. 2. Water sparingly. 3. Use cactus mix in a clay pot. 4. Rest it in winter with very little water.'),
('Arrowhead Plant', 'Arrow-shaped green and cream leaves. Grows quickly and stays compact.', 299.00, 18, 'Plants', 'Indoor', '/images/plant-item14.jpg',
 '1. Medium, indirect light. 2. Keep the soil lightly moist. 3. Mist in dry weather. 4. Trim long vines to keep it bushy.'),

-- ---------------- Plants / Outdoor ----------------
('Bougainvillea', 'Bright pink paper-like flowers that cover walls and fences.', 329.00, 20, 'Plants', 'Outdoor', '/images/41.jpg',
 '1. Full sun, at least 6 hours. 2. Water deeply, then let the soil dry. 3. Prune after each flowering. 4. Feed with a low-nitrogen fertilizer.'),
('Hibiscus', 'Large red flowers that bloom most of the year in warm weather.', 279.00, 25, 'Plants', 'Outdoor', '/images/43.jpg',
 '1. Full sun. 2. Keep the soil moist in summer. 3. Feed every 2 weeks while flowering. 4. Prune in early spring.'),
('Lemon Tree', 'Dwarf lemon tree that fruits in a large pot or garden bed.', 899.00, 8, 'Plants', 'Outdoor', '/images/44.jpg',
 '1. Full sun. 2. Water when the top 5 cm of soil is dry. 3. Feed with citrus fertilizer. 4. Protect from frost.'),
('Dragon Tree', 'Spiky, palm-like tree that gives gardens a bold look.', 1199.00, 5, 'Plants', 'Outdoor', '/images/45.jpg',
 '1. Full sun to light shade. 2. Water when dry. 3. Use well-draining soil. 4. Remove lower dead leaves.'),
('Tulsi (Holy Basil)', 'Fragrant holy basil for tea, cooking and the courtyard.', 149.00, 40, 'Plants', 'Outdoor', '/images/47.jpg',
 '1. Full sun. 2. Water daily in hot weather. 3. Pinch flower buds for more leaves. 4. Harvest leaves from the top.'),
('Lavender', 'Purple, scented flower spikes loved by bees and butterflies.', 349.00, 18, 'Plants', 'Outdoor', '/images/48.jpg',
 '1. Full sun. 2. Water lightly; it hates wet roots. 3. Use sandy soil. 4. Trim after flowering.'),
('Ixora', 'Clusters of small coral-pink flowers. Thrives in warm, humid places.', 299.00, 20, 'Plants', 'Outdoor', '/images/49.jpg',
 '1. Full sun to partial shade. 2. Keep the soil moist. 3. Feed monthly. 4. Prune lightly to shape.'),

-- ---------------- Plants / Hanging ----------------
('Heartleaf Vine', 'Trailing vine with heart-shaped leaves and tiny purple flowers.', 279.00, 15, 'Plants', 'Hanging', '/images/50.jpg',
 '1. Bright, indirect light. 2. Water when the top soil is dry. 3. Let the vines trail from a basket. 4. Trim to keep tidy.'),
('String of Pearls', 'Bead-like leaves hanging down like a necklace.', 399.00, 15, 'Plants', 'Hanging', '/images/51.jpg',
 '1. Bright light. 2. Water every 2 weeks. 3. Use cactus soil. 4. Do not bury the pearls in soil.'),
('Sword Fern', 'Bright green fronds that spill over the edge of a hanging pot.', 349.00, 12, 'Plants', 'Hanging', '/images/52.jpg',
 '1. Indirect light. 2. Keep soil moist. 3. Mist regularly. 4. Remove old fronds.'),
('Hoya (Wax Plant)', 'Waxy leaves and sweet-smelling star flowers on long vines.', 449.00, 10, 'Plants', 'Hanging', '/images/53.jpg',
 '1. Bright, indirect light. 2. Let the soil dry between waterings. 3. Do not cut old flower stems. 4. Feed monthly in summer.'),
('Creeping Jenny', 'Fast-spreading ground cover that also trails nicely from baskets.', 199.00, 20, 'Plants', 'Hanging', '/images/54.jpg',
 '1. Sun or partial shade. 2. Keep the soil moist. 3. Trim to control spread. 4. Feed in spring.'),
('String of Hearts', 'Delicate vine with tiny heart-shaped leaves.', 379.00, 12, 'Plants', 'Hanging', '/images/56.jpg',
 '1. Bright, indirect light. 2. Water when the soil is dry. 3. Use a light, airy mix. 4. Trim long strands to make it fuller.'),
('Asparagus Fern', 'Soft, feathery foliage that looks like a little green cloud.', 249.00, 18, 'Plants', 'Hanging', '/images/57.jpg',
 '1. Bright, indirect light. 2. Keep evenly moist. 3. Mist in dry weather. 4. Repot when roots fill the pot.'),
('Burro''s Tail', 'Succulent with long tails of plump blue-green leaves.', 329.00, 14, 'Plants', 'Hanging', '/images/58.jpg',
 '1. Bright light. 2. Water every 2-3 weeks. 3. Avoid touching; leaves drop easily. 4. Replant fallen leaves to grow new plants.'),

-- ---------------- Plants / Flowering ----------------
('Marigold', 'Cheerful orange blooms that also keep some garden pests away.', 99.00, 50, 'Plants', 'Flowering', '/images/40.jpg',
 '1. Full sun. 2. Water at the base, not on the flowers. 3. Remove dead flowers. 4. Feed every 2 weeks.'),
('Periwinkle (Vinca)', 'Pink star flowers that bloom all summer with very little care.', 129.00, 40, 'Plants', 'Flowering', '/images/42.jpg',
 '1. Sun or light shade. 2. Water when dry. 3. Tolerates heat well. 4. Pinch tips for more flowers.'),
('Chrysanthemum', 'Big, layered peach-pink flowers. A classic festive plant.', 199.00, 30, 'Plants', 'Flowering', '/images/46.jpg',
 '1. Full sun. 2. Keep soil moist. 3. Pinch shoots until mid-summer. 4. Feed every 2 weeks while budding.'),
('Petunia', 'Bright purple trumpet flowers for pots, beds and baskets.', 149.00, 35, 'Plants', 'Flowering', '/images/59.jpg',
 '1. Full sun. 2. Water when the top soil is dry. 3. Remove faded flowers. 4. Feed weekly with liquid fertilizer.'),
('Gerbera Daisy', 'Large red daisy flowers on long stems. Lovely as cut flowers.', 179.00, 30, 'Plants', 'Flowering', '/images/60.jpg',
 '1. Bright sun in the morning. 2. Water at the soil, keep leaves dry. 3. Use well-draining soil. 4. Remove old flowers at the base.'),
('Dahlia', 'Showy pink and orange blooms from summer to autumn.', 229.00, 25, 'Plants', 'Flowering', '/images/61.jpg',
 '1. Full sun. 2. Water deeply twice a week. 3. Stake tall stems. 4. Cut flowers often to get more.'),
('Geranium', 'Hot-pink flowers and scented leaves. Great on balconies.', 189.00, 25, 'Plants', 'Flowering', '/images/62.jpg',
 '1. Full sun. 2. Let the soil dry between waterings. 3. Deadhead regularly. 4. Bring indoors in winter.'),

-- ---------------- Care / Garden Tools ----------------
('Gardening Gloves', 'Breathable cotton gloves that protect hands from thorns and soil.', 199.00, 50, 'Care', 'Garden Tools', '/images/63.jpg', NULL),
('Pruning Shears', 'Sharp bypass shears for clean cuts on stems and small branches.', 349.00, 30, 'Care', 'Garden Tools', '/images/64.jpg', NULL),
('Hand Fork', 'Stainless steel fork for loosening soil and removing weeds.', 149.00, 40, 'Care', 'Garden Tools', '/images/65.jpg', NULL),
('Floral Watering Can', 'Painted metal watering can with a long spout. Holds 2 litres.', 449.00, 20, 'Care', 'Garden Tools', '/images/66.jpg', NULL),
('Garden Spade', 'Strong spade with a wooden handle for digging beds and planting.', 599.00, 15, 'Care', 'Garden Tools', '/images/67.jpg', NULL),

-- ---------------- Care / Fertilizers ----------------
('Perlite Soil Booster (1 kg)', 'Light white granules that improve drainage and air in potting soil.', 149.00, 40, 'Care', 'Fertilizers', '/images/68.jpg', NULL),
('Vermicompost (5 kg)', 'Organic worm compost that feeds plants slowly and improves soil.', 199.00, 35, 'Care', 'Fertilizers', '/images/69.jpg', NULL),
('Bone Meal (1 kg)', 'Natural source of phosphorus for strong roots and more flowers.', 249.00, 30, 'Care', 'Fertilizers', '/images/70.jpg', NULL),
('NPK 19-19-19 (500 g)', 'Balanced water-soluble fertilizer for all plants.', 299.00, 30, 'Care', 'Fertilizers', '/images/71.jpg', NULL),
('Neem Cake Powder (1 kg)', 'Organic fertilizer that also helps keep soil pests away.', 179.00, 35, 'Care', 'Fertilizers', '/images/72.jpg', NULL),

-- ---------------- Care / Decoration ----------------
('Tiered Bird Bath Fountain', 'Classic three-tier stone fountain for the centre of a garden.', 2499.00, 5, 'Care', 'Decoration', '/images/73.jpg', NULL),
('Hanging Bird Feeder', 'Red metal and glass feeder that brings birds to your garden.', 399.00, 15, 'Care', 'Decoration', '/images/74.jpg', NULL),
('Terracotta Garden Gnome', 'A friendly clay gnome to guard your flower beds.', 349.00, 20, 'Care', 'Decoration', '/images/75.jpg', NULL),
('Vertical Wall Planter', 'Wooden shelf planter for growing herbs and flowers on a wall.', 1299.00, 8, 'Care', 'Decoration', '/images/76.jpg', NULL),
('Stone Stepping Path (Set of 6)', 'Natural grey stones to make a simple garden path.', 899.00, 10, 'Care', 'Decoration', '/images/78.jpg', NULL),
('Metal Wind Chime', 'Copper-tone wind chime with a calm, soft sound.', 499.00, 15, 'Care', 'Decoration', '/images/79.jpg', NULL),
('Wooden Garden Swing', 'White two-seater swing bench for a relaxing corner.', 7999.00, 3, 'Care', 'Decoration', '/images/80.jpg', NULL),
('Decorative Pebbles (2 kg)', 'Mixed river pebbles for pots, borders and paths.', 249.00, 30, 'Care', 'Decoration', '/images/81.jpg', NULL),

-- ---------------- Care / Seeds ----------------
('Sunflower Seeds', 'Packet of 30 seeds for tall, bright sunflowers.', 79.00, 60, 'Care', 'Seeds', '/images/82.jpg',
 '1. Sow 2 cm deep in full sun. 2. Water daily until they sprout (7-10 days). 3. Thin seedlings to 30 cm apart. 4. Support tall stems.'),
('Cherry Tomato Seeds', 'Packet of 50 seeds for sweet cherry tomatoes.', 59.00, 60, 'Care', 'Seeds', '/images/83.jpg',
 '1. Sow in trays 0.5 cm deep. 2. Transplant after 4 weeks. 3. Give full sun and a stake. 4. Water at the base regularly.'),
('Marigold Seeds', 'Packet of 40 seeds for orange and yellow marigolds.', 49.00, 60, 'Care', 'Seeds', '/images/84.jpg',
 '1. Sow 1 cm deep. 2. Keep soil moist until sprouting. 3. Transplant at 5 cm tall. 4. Full sun for best flowers.'),
('Basil Seeds', 'Packet of 100 seeds for fragrant sweet basil.', 49.00, 60, 'Care', 'Seeds', '/images/85.jpg',
 '1. Sprinkle on moist soil and cover lightly. 2. Keep warm and sunny. 3. Thin seedlings. 4. Pinch tops to make it bushy.'),
('Spinach Seeds', 'Packet of 100 seeds for quick-growing leafy spinach.', 39.00, 60, 'Care', 'Seeds', '/images/86.jpg',
 '1. Sow 1 cm deep in cool weather. 2. Keep the soil moist. 3. Harvest outer leaves after 30 days. 4. Sow again every 3 weeks.'),
('Cucumber Seeds', 'Packet of 25 seeds for crunchy salad cucumbers.', 59.00, 60, 'Care', 'Seeds', '/images/87.jpg',
 '1. Sow 2 cm deep in warm soil. 2. Give a trellis to climb. 3. Water deeply and often. 4. Pick cucumbers while young.'),
('Green Chilli Seeds', 'Packet of 50 seeds for hot green chillies.', 49.00, 60, 'Care', 'Seeds', '/images/88.jpg',
 '1. Sow in trays 0.5 cm deep. 2. Transplant after 5 weeks. 3. Full sun. 4. Feed every 2 weeks once flowering starts.'),
('Lavender Seeds', 'Packet of 50 seeds for scented purple lavender.', 99.00, 40, 'Care', 'Seeds', '/images/89.jpg',
 '1. Chill seeds in the fridge for 2 weeks. 2. Sow on the surface; they need light. 3. Keep slightly moist. 4. Transplant to a sunny, dry spot.'),
('Carrot Seeds', 'Packet of 200 seeds for sweet orange carrots.', 49.00, 60, 'Care', 'Seeds', '/images/90.jpg',
 '1. Sow 1 cm deep in loose, stone-free soil. 2. Keep moist until they sprout. 3. Thin to 5 cm apart. 4. Harvest after 70-80 days.'),

-- ---------------- Eco-Friendly ----------------
('Biodegradable Seedling Pots (Pack of 5)', 'Plant-based pots that go straight into the ground and break down naturally.', 199.00, 40, 'Eco-Friendly', 'Biodegradable Pots', '/images/22.jpg', NULL),
('Rain Barrel 200 L', 'Collects rainwater from your roof for watering the garden. Comes with a tap.', 2999.00, 6, 'Eco-Friendly', 'Rain Barrels', '/images/21.jpg', NULL),
('Rain Barrel 100 L', 'Smaller rain barrel for balconies and small gardens.', 1899.00, 8, 'Eco-Friendly', 'Rain Barrels', '/images/21.jpg', NULL),
('Solar Fairy Lights', 'Warm solar-powered string lights for bushes and trees. No wiring needed.', 599.00, 20, 'Eco-Friendly', 'Garden Lights', '/images/77.jpg', NULL),
('Solar Path Lanterns (Set of 4)', 'Lantern-style solar lights that line garden paths at night.', 1199.00, 12, 'Eco-Friendly', 'Garden Lights', '/images/20.jpg', NULL);
