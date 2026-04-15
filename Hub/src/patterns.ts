export type Category = 'behavioral' | 'creational' | 'structural';

export interface Pattern {
  name: string;
  category: Category;
  demo: string;
  coreIdea: string;
  path: string;
  hasDemo: boolean;
  markdown: string;
}

export const patterns: Pattern[] = [

  // ── BEHAVIORAL ──────────────────────────────────────────────────────────────

  {
    name: 'Chain of Responsibility',
    category: 'behavioral',
    demo: 'Form field validation',
    coreIdea: 'Handlers linked in a chain; each validates one rule and passes to the next',
    path: 'Behavioral/ChainOfResponsibility',
    hasDemo: true,
    markdown: `## Chain of Responsibility Pattern

**Demo:** Form validation — username, email, and password fields each pass through a chain of validators.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`ValidationHandler\` (interface) | Contract: \`setNextHandler()\` + \`handleValidation()\` |
| \`BaseHandler\` (abstract) | Stores \`nextHandler\`; concrete handlers extend this |
| \`RequiredFieldHandler\` | First in chain; rejects empty fields |
| \`UsernameFormatHandler\` | Validates alphanumeric-only username |
| \`EmailFormatHandler\` | Validates email format via regex |
| \`PasswordFormatHandler\` | Validates min 8 chars, uppercase, lowercase, digit |

### Chain Structure

\`\`\`
RequiredFieldHandler("username")
  → UsernameFormatHandler
    → RequiredFieldHandler("email")
      → EmailFormatHandler
        → RequiredFieldHandler("password")
          → PasswordFormatHandler
\`\`\`

\`handleValidation()\` returns \`false\` on the first failure, \`true\` if the entire chain passes. Each handler calls \`this.nextHandler.handleValidation()\` to continue down the chain.

### Key Insight
Each handler knows only its own rule and its successor. Adding a new validation step requires only inserting a new handler into the chain — no changes to existing handlers.`,
  },

  {
    name: 'Command',
    category: 'behavioral',
    demo: 'Database record insert with undo',
    coreIdea: 'Encapsulate operations as objects with execute/undo; maintain a history stack',
    path: 'Behavioral/Command',
    hasDemo: true,
    markdown: `## Command Pattern

**Demo:** Database record manager — insert records with full undo support.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`Command\` (interface) | Contract: \`execute()\` + \`undo()\` |
| \`Database\` (interface) | Contract: \`insert()\` + \`delete()\` |
| \`ApplicationDatabase\` | Receiver — performs DOM manipulation for insert/delete |
| \`InsertDatabase\` | Command — \`execute()\` calls \`db.insert()\`, \`undo()\` calls \`db.delete()\` |
| \`DeleteDatabase\` | Command — inverse of InsertDatabase |
| \`DatabaseApplication\` | Invoker — maintains \`history: Command[]\`; \`insert()\` executes and pushes, \`undo()\` pops and undoes |

### Flow

\`\`\`
DatabaseApplication.insert()
  → creates InsertDatabase command
  → pushes to history stack
  → calls execute()
    → ApplicationDatabase.insert() updates DOM

DatabaseApplication.undo()
  → pops last command from history
  → calls undo()
    → ApplicationDatabase.delete() reverses DOM change
\`\`\`

### Key Insight
Commands are first-class objects. The invoker (\`DatabaseApplication\`) doesn't know what operation a command performs — it only knows \`execute()\` and \`undo()\`. This decouples the sender from the receiver and makes undo/redo trivial to add.`,
  },

  {
    name: 'Iterator',
    category: 'behavioral',
    demo: 'LRU cache traversal',
    coreIdea: 'Custom iterator over a doubly-linked list; exposes MRU/LRU access without exposing internals',
    path: 'Behavioral/Iterator',
    hasDemo: true,
    markdown: `## Iterator Pattern

**Demo:** LRU (Least Recently Used) Cache — add/get items and display current MRU/LRU values via a custom iterator.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`LRUIterator\` (interface) | Contract: \`reset()\`, \`lru()\`, \`mru()\`, \`next()\`, \`getCurrent()\`, \`hasNext()\` |
| \`LRUNode\` | Doubly-linked node: \`key\`, \`value\`, \`prev\`, \`next\` |
| \`LRULinkedList\` | Manages \`head\`/\`tail\` sentinels; \`add()\` inserts at head, \`remove()\` detaches a node |
| \`LRUCache\` | Wraps \`Map<string, LRUNode>\` + \`LRULinkedList\`; \`put()\` evicts LRU when at capacity, \`get()\` moves node to MRU position |
| \`LRUconcreteIterator\` | Implements \`LRUIterator\`; traverses from \`head.next\` (MRU) toward \`tail.prev\` (LRU) |

### Key Details

- \`lru()\` returns \`tail.prev\`; \`mru()\` returns \`head.next\`
- Eviction in \`put()\`: if capacity exceeded, \`LRULinkedList.remove(tail.prev)\` and \`Map.delete()\`
- Iterator traversal order is MRU → LRU (most-recently-used first)

### Key Insight
Client code calls \`iterator.next()\` and \`iterator.getCurrent()\` without knowing anything about the underlying doubly-linked list structure. The iterator hides the traversal algorithm.`,
  },

  {
    name: 'Mediator',
    category: 'behavioral',
    demo: 'Chat room messaging',
    coreIdea: 'Users communicate through a central ChatRoom mediator, never directly with each other',
    path: 'Behavioral/Mediator',
    hasDemo: true,
    markdown: `## Mediator Pattern

**Demo:** Chat room — users send messages through a central mediator instead of communicating directly.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`User\` (interface) | Data shape: \`id\`, \`name\` |
| \`ChatMediator\` (interface) | Contract: \`sendMessage(sender, receiver, message)\` |
| \`Component\` (abstract) | Holds a \`mediator\` reference; subclasses use it to communicate |
| \`ChatRoom\` | Concrete mediator — registers users, routes messages, updates DOM |
| \`UserComponent\` | Extends \`Component\`; \`sendMessage()\` delegates to \`this.mediator.sendMessage()\` |

### Flow

\`\`\`
UserComponent.sendMessage(receiver, message)
  → ChatRoom.sendMessage(sender, receiver, message)
    → ChatRoom updates the chat display DOM element
\`\`\`

UserComponents never reference each other directly — all traffic flows through the single \`ChatRoom\` instance.

### Key Insight
Without a mediator, N users would need N×(N-1) direct connections. With a mediator, every user needs only one connection — to the mediator. This reduces coupling from O(n²) to O(n).`,
  },

  {
    name: 'Memento',
    category: 'behavioral',
    demo: 'Rich text editor undo',
    coreIdea: 'Snapshots of editor state stored as opaque objects in a caretaker stack',
    path: 'Behavioral/Memento',
    hasDemo: true,
    markdown: `## Memento Pattern

**Demo:** Rich text editor with undo — user edits content and can revert to previous states.

### Class Roles

| Class | Role |
|---|---|
| \`RichTextEditor\` | Originator — holds current content string synced to a DOM element; creates/restores mementos |
| \`EditorMemento\` | Memento — immutable snapshot storing a single \`content\` string |
| \`UndoManager\` | Caretaker — maintains \`history: EditorMemento[]\`; \`saveState()\` pushes snapshot, \`undo()\` pops and restores |

### Flow

\`\`\`
User types
  → UndoManager.saveState()
    → creates EditorMemento(currentContent)
    → pushes onto history stack

User clicks undo
  → UndoManager.undo()
    → pops last EditorMemento
    → RichTextEditor.setContent(memento.content)
      → DOM updates
\`\`\`

### Key Insight
\`RichTextEditor\` never exposes its internal state directly. History is stored externally in \`UndoManager\` as opaque \`EditorMemento\` objects — the caretaker can save and restore state without knowing what's inside the memento.`,
  },

  {
    name: 'Observer',
    category: 'behavioral',
    demo: 'Activity log subscription',
    coreIdea: 'Log notifies multiple User observers on every state change without them polling',
    path: 'Behavioral/Observer',
    hasDemo: true,
    markdown: `## Observer Pattern

**Demo:** Activity log — multiple user observers subscribe to a central log; all are notified when new entries are added.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`Observer\` (interface) | Contract: \`update()\` |
| \`Subject\` (interface) | Contract: \`add()\`, \`remove()\`, \`notify()\` |
| \`Log\` | Concrete subject — holds \`ObserverList: Observer[]\` and \`logList: string[]\`; \`setState()\` appends to log and calls \`notify()\` |
| \`User\` | Concrete observer — subscribed to \`Log\`; \`update()\` fetches latest log entry and renders it to DOM |

### Flow

\`\`\`
Log.setState(entry)
  → appends to logList
  → notify()
    → User1.update() → reads latest entry → updates DOM
    → User2.update() → reads latest entry → updates DOM
    → User3.update() → reads latest entry → updates DOM
\`\`\`

### Key Insight
Push model: the subject triggers all observers on every state change without any observer requesting it. Observers can be added/removed at runtime without modifying \`Log\`.`,
  },

  {
    name: 'State',
    category: 'behavioral',
    demo: 'Bank account with balance tiers',
    coreIdea: 'Account delegates deposit/withdraw behavior entirely to the current State object',
    path: 'Behavioral/State',
    hasDemo: true,
    markdown: `## State Pattern

**Demo:** Bank account with balance-tier behavior — account operates differently depending on whether it is in Red, Silver, or Gold status.

### Class Roles

| Class | Role |
|---|---|
| \`State\` (abstract) | Holds \`Account\` reference; abstract \`deposit()\` and \`withdraw()\`; \`name\` property |
| \`Account\` | Context — delegates \`deposit()\`/\`withdraw()\` to current \`State\`; \`transitionTo()\` swaps state |
| \`Red\` | Negative balance — deposit increases balance; withdraw incurs a fee; transitions to Silver when balance > 0 |
| \`Silver\` | Standard tier — normal deposit/withdraw; transitions to Red (< 0) or Gold (> 1000) |
| \`Gold\` | Premium tier — deposit adds a 5% interest bonus; transitions to Red (< 0) or Silver (< 1000) |

### Transition Logic

Each state's \`deposit()\`/\`withdraw()\` modifies \`account.balance\` then checks thresholds and calls \`account.transitionTo(new TargetState())\` when a boundary is crossed.

### Key Insight
The \`Account\` itself contains no conditional logic — all behavior is owned by the current \`State\` object. Switching state is as simple as \`account.transitionTo(new Gold())\`.`,
  },

  {
    name: 'Strategy',
    category: 'behavioral',
    demo: 'Payment methods with different fee logic',
    coreIdea: 'User selects a payment algorithm at runtime; swapping the strategy changes the fee with no changes to User',
    path: 'Behavioral/Strategy',
    hasDemo: true,
    markdown: `## Strategy Pattern

**Demo:** Payment methods — user selects Credit Card, PayPal, or Bank Transfer; each applies a different fee calculation.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`Payment\` (interface) | Contract: \`pay(user): number\` — returns the amount after fees |
| \`User\` | Context — holds \`amount\`, \`securityCode\`, \`password\`; \`payment(strategy)\` delegates to strategy and updates balance |
| \`CreditCardPayment\` | Strategy — validates \`securityCode\`; applies APR fee per day |
| \`PaypalPayment\` | Strategy — subtracts flat $5 fee |
| \`BankPayment\` | Strategy — validates \`password\`; subtracts $3 fee |

### Flow

\`\`\`
user.payment(new CreditCardPayment())
  → strategy.pay(user)          // reads user properties
    → calculates result
    → returns new amount
  → user.balance = result
\`\`\`

### Key Insight
Strategy is selected at runtime — swapping the strategy object changes the entire fee algorithm with no changes to \`User\`. New payment methods require only a new class implementing \`Payment\`.`,
  },

  {
    name: 'Template Method',
    category: 'behavioral',
    demo: 'Logging with three severity levels',
    coreIdea: 'Abstract base defines the log() skeleton; subclasses override only the steps that differ',
    path: 'Behavioral/Template',
    hasDemo: true,
    markdown: `## Template Method Pattern

**Demo:** Logging system with three severity levels — Info, Trace, and Error each share the same logging skeleton but differ in notification message and optional high-tier alerting.

### Class Roles

| Class | Role |
|---|---|
| \`LogTemplate\` (abstract) | Defines the template method \`log()\`: calls \`notify()\` → \`saveLog()\` → \`highTierNotify()\`; implements \`saveLog()\`; provides empty default \`highTierNotify()\` |
| \`InfoLog\` | Overrides \`notify()\` to output \`"INFO: LOGGED"\` |
| \`TraceLog\` | Overrides \`notify()\` to output \`"TRACE: LOGGED"\` |
| \`ErrorLog\` | Overrides \`notify()\` to output \`"ERROR: LOGGED"\`; overrides \`highTierNotify()\` to log a security warning |

### Algorithm Skeleton

\`\`\`
log()
  1. notify()           ← abstract, must override
  2. saveLog()          ← implemented in base class (shared)
  3. highTierNotify()   ← hook, default is no-op; ErrorLog overrides
\`\`\`

### Key Insight
\`saveLog()\` is a concrete step common to all log types. \`highTierNotify()\` is a hook — only \`ErrorLog\` provides a non-empty implementation. Subclasses never override \`log()\` itself; the algorithm structure is fixed in the base class.`,
  },

  {
    name: 'Visitor',
    category: 'behavioral',
    demo: 'Employee payroll bonus processing',
    coreIdea: 'PayrollProcessor visits each employee type with type-specific bonus rates without modifying employee classes',
    path: 'Behavioral/Visitor',
    hasDemo: true,
    markdown: `## Visitor Pattern

**Demo:** Payroll processing — Engineers receive a 10% salary bonus, Managers receive 20%, applied by a visitor without modifying the employee classes.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`Employee\` (interface) | Data shape: \`name\`, \`salary\`, \`department\`; declares \`accept(visitor)\` |
| \`EmployeeVisitor\` (interface) | Contract: \`visit(employee)\` |
| \`Engineer\` | Concrete element — implements \`accept()\`, calls \`visitor.visit(this)\` |
| \`Manager\` | Concrete element — implements \`accept()\`, calls \`visitor.visit(this)\` |
| \`PayrollProcessor\` | Concrete visitor — \`visit()\` checks \`instanceof\` and applies 10% (Engineer) or 20% (Manager) bonus |

### Double Dispatch

\`\`\`
employee.accept(payrollProcessor)
  → payrollProcessor.visit(employee)
    → instanceof check selects bonus rate
    → returns adjusted salary
\`\`\`

### Key Insight
The salary algorithm lives entirely in the visitor, leaving employee classes unchanged. Adding a new operation (e.g., tax calculation) requires only a new Visitor class — no changes to \`Engineer\` or \`Manager\`.`,
  },

  // ── CREATIONAL ──────────────────────────────────────────────────────────────

  {
    name: 'Abstract Factory',
    category: 'creational',
    demo: 'UI theme switcher (Text vs Image)',
    coreIdea: 'Two factories each produce a coordinated family of Navigation/Window/Content components',
    path: 'Creational/AbstractFactory',
    hasDemo: true,
    markdown: `## Abstract Factory Pattern

**Demo:** UI theme switcher — selecting "Text" or "Image" theme produces a coordinated set of Navigation, Window, and Content components.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`DisplayThemeGenerator\` (interface) | Factory contract: \`createNavigation()\`, \`createWindow()\`, \`createContent()\` |
| \`DisplayNavigation\` / \`DisplayWindow\` / \`DisplayContent\` (interfaces) | Product contracts: each declares \`display()\` |
| \`TextTheme\` | Concrete factory — creates Text-family products (dark brown nav, pink window, Lorem Ipsum content) |
| \`ImageTheme\` | Concrete factory — creates Image-family products (purple nav, light-purple window, Unsplash image content) |
| \`Text*\` / \`Image*\` classes | Concrete products — implement \`display()\` with theme-specific DOM manipulation |

### Flow

\`\`\`
Client selects TextTheme or ImageTheme factory
  → factory.createNavigation() → product.display()
  → factory.createWindow()     → product.display()
  → factory.createContent()    → product.display()
\`\`\`

### Key Insight
Swapping the factory swaps the entire coordinated UI family. Client code never references concrete product classes directly — only the abstract interfaces. Adding a new theme requires only a new factory + product set.`,
  },

  {
    name: 'Builder',
    category: 'creational',
    demo: 'Dashboard widget configurator',
    coreIdea: 'WidgetBuilder chains setters fluently; DashboardBuilder composes multiple widgets into HTML',
    path: 'Creational/Builder',
    hasDemo: true,
    markdown: `## Builder Pattern

**Demo:** Dashboard widget configurator — user sets title, content, colors, font, height, and alignment step-by-step, then adds the widget to a dashboard.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`Builder\` (interface) | Fluent contract: \`setTitle()\`, \`setContent()\`, \`setColor()\`, \`setTextColor()\`, \`setFont()\`, \`setHeight()\`, \`setTextAlign()\` — all return \`this\` |
| \`Widget\` | Product — holds all style/content properties; \`render()\` returns a styled HTML \`<div>\` string |
| \`WidgetBuilder\` | Concrete builder — each setter delegates to internal \`Widget\` and returns \`this\`; \`build()\` returns the configured \`Widget\` |
| \`DashboardBuilder\` | Director-like composer — holds \`Widget[]\`; \`addWidget()\` pushes and chains; \`buildDashboard()\` renders all widgets as combined HTML |

### Flow

\`\`\`
new WidgetBuilder()
  .setTitle("Sales")
  .setColor("blue")
  .setHeight("200px")
  .build()                    → Widget

dashboardBuilder
  .addWidget(widget)
  .buildDashboard()           → HTML string injected into DOM
\`\`\`

### Key Insight
The fluent interface lets complex objects be assembled step-by-step. The same builder can produce different widget configurations without constructor sprawl.`,
  },

  {
    name: 'Factory Method',
    category: 'creational',
    demo: 'HTTP response page renderer',
    coreIdea: 'Factory selects the correct WebPage subclass based on HTTP response code',
    path: 'Creational/FactoryMethod',
    hasDemo: true,
    markdown: `## Factory Method Pattern

**Demo:** HTTP response page renderer — different response codes (200, 404, 503, 511) produce different page types via a factory hierarchy.

### Class Roles

| Class | Role |
|---|---|
| \`WebPage\` (abstract) | Product base — holds DOM element refs; provides \`displayImage()\` + \`displayArticle()\` helpers; declares abstract \`display()\` |
| \`WebPageGenerator\` (abstract) | Creator base — declares abstract \`createWebPage(response)\` returning \`WebPage\` |
| \`ContentWebPageResponse\` | Concrete factory — creates \`DefaultWebPage\` (404) or \`ContentWebPage\` (200) |
| \`SecurityWebPageResponse\` | Concrete factory — creates \`SecurityWebPage\` (511) or \`ServiceWebPage\` (503) |
| \`DefaultWebPage\` | 404 — displays default image/article |
| \`ContentWebPage\` | 200 — displays response content |
| \`SecurityWebPage\` | 511 — displays stop image and "Cannot access" message |
| \`ServiceWebPage\` | 503 — displays response content/article |

### Flow

\`\`\`
HTTPWebResponse(code)
  → routes to ContentWebPageResponse or SecurityWebPageResponse
    → factory.createWebPage(response)
      → returns appropriate WebPage subclass
        → webPage.display()
\`\`\`

### Key Insight
The factory method delegates instantiation to subclasses. Adding a new response code (e.g., 301) requires only a new \`WebPage\` subclass and updating the factory — no changes to the client.`,
  },

  {
    name: 'Prototype',
    category: 'creational',
    demo: 'Menu item cloning',
    coreIdea: 'A base prototype is cloned to create multiple similar items, then each is customized',
    path: 'Creational/Prototype',
    hasDemo: true,
    markdown: `## Prototype Pattern

**Demo:** Menu item cloning — a base prototype is cloned to create multiple menu items, each customized with different labels and links.

### Class Roles

| Class | Role |
|---|---|
| \`MenuItem\` | Prototype — holds \`label\`, \`icon\`, \`link\`, \`isVisible\`; \`clone()\` returns a shallow copy via \`new MenuItem(...)\` with current values |

### Flow

\`\`\`
baseMenuItemPrototype  (Home, icon, /, visible)
  .clone() → menuItem1  (modified: label="About", link="/about")
  .clone() → menuItem2  (modified: label="Contact", link="/contact")
\`\`\`

Cloned items start with the prototype's values, then specific properties are overwritten. The array of clones is rendered to the DOM.

### Key Insight
Avoids repeated constructor calls with the same boilerplate values for each item in a family of similar objects. When cloning is expensive (deep object graphs), the prototype pattern amortizes construction cost.`,
  },

  // ── STRUCTURAL ──────────────────────────────────────────────────────────────

  {
    name: 'Adapter',
    category: 'structural',
    demo: 'Media player (YouTube / MP4 / text)',
    coreIdea: 'MediaAdapter wraps AdvancedMediaPlayer to satisfy the MediaPlayer interface',
    path: 'Structural/Adapter',
    hasDemo: false,
    markdown: `## Adapter Pattern

**Demo:** Media player — a standard \`MediaPlayer\` interface is used to play YouTube videos, MP4 files, and text files despite the underlying players having incompatible interfaces.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`MediaPlayer\` (interface) | Target interface: \`play(mediaType, fileName)\` |
| \`AdvancedMediaPlayer\` (interface) | Adaptee interface: \`playVid(fileName)\` + \`playMusic(fileName)\` |
| \`YouTubePlayer\` | Adaptee — implements \`AdvancedMediaPlayer.playVid()\` |
| \`Mp4Player\` | Adaptee — implements \`AdvancedMediaPlayer.playMusic()\` |
| \`MediaAdapter\` | Adapter — implements \`MediaPlayer\`; wraps an \`AdvancedMediaPlayer\`; \`play()\` routes to \`playVid()\` or \`playMusic()\` |
| \`AudioTextReader\` | Client-facing class — implements \`MediaPlayer\`; handles \`.txt\` directly; delegates \`youtube\`/\`mp4\` types to \`MediaAdapter\` |

### Flow

\`\`\`
client.play("youtube", "video.mp4")
  → AudioTextReader.play()
    → creates MediaAdapter(new YouTubePlayer())
    → adapter.play("youtube", "video.mp4")
      → YouTubePlayer.playVid("video.mp4")
\`\`\`

### Key Insight
The adapter translates the target interface into the adaptee's interface. Client code calls \`play()\` uniformly regardless of media type — it never knows whether a YouTubePlayer or Mp4Player is doing the work.`,
  },

  {
    name: 'Bridge',
    category: 'structural',
    demo: 'Notification type × display method',
    coreIdea: 'Decouples notification type (Email/SMS) from display method (Toast/Modal); 2×2 combinations without 4 subclasses',
    path: 'Structural/Bridge',
    hasDemo: true,
    markdown: `## Bridge Pattern

**Demo:** Notification system — notification type (Email, SMS) and display method (Toast, Modal) are independent hierarchies combined at runtime via a bridge.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`SampleNotification\` (interface) | Abstraction: \`send(message)\` |
| \`NotificationDisplay\` (interface) | Implementation: \`display(message)\` |
| \`EmailNotification\` | Concrete abstraction — sends email (logs to console) |
| \`SMSNotification\` | Concrete abstraction — sends SMS (logs to console) |
| \`ToastNotificationDisplay\` | Concrete implementation — auto-dismissing toast UI |
| \`ModalNotificationDisplay\` | Concrete implementation — modal dialog UI |
| \`NotificationBridge\` | Bridge — composes one \`SampleNotification\` + one \`NotificationDisplay\`; \`sendAndDisplay()\` calls both |

### Flow

\`\`\`
new NotificationBridge(new EmailNotification(), new ToastNotificationDisplay())
  .sendAndDisplay(message)
    → EmailNotification.send(message)
    → ToastNotificationDisplay.display(message)
\`\`\`

### Key Insight
2 notification types × 2 display types = 4 combinations without 4 subclasses. Changing either side requires no change to the other. The bridge is assembled at runtime by composing any abstraction with any implementation.`,
  },

  {
    name: 'Composite',
    category: 'structural',
    demo: 'Store inventory pricing',
    coreIdea: 'Product (leaf) and Store (composite) both implement getPrice(); Store sums its Products uniformly',
    path: 'Structural/Composite',
    hasDemo: true,
    markdown: `## Composite Pattern

**Demo:** Store inventory pricing — individual products and stores containing multiple products both report a total price through the same interface.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`ProductComponent\` (interface) | Uniform contract: \`getPrice()\` |
| \`Product\` | Leaf — holds a single price; \`getPrice()\` returns it directly |
| \`Store\` | Composite — holds \`Product[]\`; \`getPrice()\` returns accumulated total; \`addProduct()\` appends and updates total |

### Tree Structure

\`\`\`
Store (composite)          getPrice() = 55
  ├── Product (leaf)       $10
  ├── Product (leaf)       $25
  └── Store (composite)   getPrice() = 20
        ├── Product        $15
        └── Product        $5
\`\`\`

### Key Insight
Client code calls \`getPrice()\` on any node without knowing whether it is a leaf or composite. A \`Store\` can be nested inside another \`Store\`, enabling arbitrarily deep trees. The composite and leaf satisfy the same interface — the client never needs to distinguish between them.`,
  },

  {
    name: 'Decorator',
    category: 'structural',
    demo: 'Weapon upgrade system',
    coreIdea: 'Sword is wrapped by upgrade decorators in any combination; each layer adds to the result',
    path: 'Structural/Decorator',
    hasDemo: true,
    markdown: `## Decorator Pattern

**Demo:** Weapon upgrade system — a base \`Sword\` is wrapped with any combination of damage, modifier, and special upgrades at runtime.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`Weapon\` (interface) | Contract: \`getDamage()\`, \`getSpecial()\`, \`getMod()\` |
| \`WeaponDecorator\` (abstract) | Wraps a \`Weapon\`; delegates all three methods to the wrapped instance by default |
| \`Sword\` | Base concrete component — returns \`0\` / empty strings for all properties |
| \`DamageUpgrade\` | Decorator — adds +50 to \`getDamage()\` result from wrapped weapon |
| \`ModUpgrade\` | Decorator — appends a random elemental modifier with 5% damage bonus to \`getMod()\` |
| \`SpecialUpgrade\` | Decorator — appends "Sharp" or "Delicate" to \`getSpecial()\` |

### Wrapping Example

\`\`\`
new SpecialUpgrade(
  new ModUpgrade(
    new DamageUpgrade(
      new Sword()        // getDamage() = 0
    )                    // getDamage() = 50
  )                      // getMod() = "Fire 2.5"
)                        // getSpecial() = "Sharp"
\`\`\`

### Key Insight
Each decorator calls the same method on its wrapped weapon and adds to the result. Order of wrapping affects the accumulated output. No \`Sword\` subclass is needed for each upgrade combination — N decorators produce N! possible combinations.`,
  },

  {
    name: 'Facade',
    category: 'structural',
    demo: 'Calculator with tax logic',
    coreIdea: 'CalculatorFacade hides Add/Subtract/Divide/Multiply behind a simple unified API',
    path: 'Structural/Facade',
    hasDemo: true,
    markdown: `## Facade Pattern

**Demo:** Calculator with tax — a \`CalculatorFacade\` provides a simple API over Add, Subtract, Divide, and Multiply subsystem classes.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`Calculator\` (interface) | Subsystem contract: \`calculate(num1, num2)\` |
| \`Add\` / \`Subtract\` / \`Divide\` / \`Multiply\` | Concrete subsystem classes — each implements one arithmetic operation |
| \`CalculatorFacade\` | Facade — instantiates all four operation classes; exposes \`calculateAdd()\`, \`calculateSubtract()\`, \`calculateDivide()\`, \`calculateMultiply()\` |

### Flow

\`\`\`
// Without facade:
new Add().calculate(a, b)
new Multiply().calculate(price, 0.28)

// With facade:
calculator.calculateAdd(a, b)
calculator.calculateMultiply(price, 0.28)
\`\`\`

The tax calculation chains \`calculateMultiply(price, rate)\` and \`calculateAdd(price, tax)\` through the facade without the client managing subsystem instances.

### Key Insight
The facade doesn't add new behavior — it simplifies the interface. Subsystem classes remain accessible directly if needed (for advanced use), while the facade handles the common case.`,
  },

  {
    name: 'Flyweight',
    category: 'structural',
    demo: 'Product catalog image sharing',
    coreIdea: 'ImageFactory caches HTMLImageElements by URL; products sharing a URL share one element',
    path: 'Structural/Flyweight',
    hasDemo: true,
    markdown: `## Flyweight Pattern

**Demo:** Product catalog — product images are expensive objects; \`ImageFactory\` caches and shares \`HTMLImageElement\` instances by URL.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`Product\` (interface) | Extrinsic state (per-item): \`id\`, \`name\`, \`price\`, \`imageSrc\` |
| \`ImageFactory\` | Flyweight factory — maintains \`Map<string, HTMLImageElement>\`; \`getImage(src)\` returns cached instance or creates and caches a new one |

### Intrinsic vs Extrinsic State

\`\`\`
Intrinsic (shared, stored in factory cache):
  URL → HTMLImageElement

Extrinsic (unique per product, passed in):
  id, name, price, imageSrc
\`\`\`

When two products share the same \`imageSrc\`, they receive the exact same \`HTMLImageElement\` instance from the cache rather than two separate objects.

### Key Insight
The flyweight pattern trades memory for lookup time. Effective when many objects share a large piece of state (the image data). The factory is the entry point — clients call \`getImage()\` rather than \`new Image()\` directly.`,
  },

  {
    name: 'Proxy',
    category: 'structural',
    demo: 'Database write access control',
    coreIdea: 'ProtectionProxyDatabaseAccess checks user.writeAccess before creating or invoking RealDatabaseAccess',
    path: 'Structural/Proxy',
    hasDemo: true,
    markdown: `## Proxy Pattern

**Demo:** Database access control — a protection proxy checks user permissions before allowing writes to the real database.

### Class Roles

| Class / Interface | Role |
|---|---|
| \`DatabaseAccess\` (interface) | Common contract: \`writeData()\` |
| \`RealDatabaseAccess\` | Real subject — performs the actual database write operation |
| \`ProtectionProxyDatabaseAccess\` | Proxy — implements \`DatabaseAccess\`; constructor checks \`user.writeAccess\` and conditionally creates \`RealDatabaseAccess\`; \`writeData()\` guards execution |
| \`User\` | Holds \`writeAccess: boolean\` flag checked by the proxy |

### Flow

\`\`\`
new ProtectionProxyDatabaseAccess(user, data)
  → if user.writeAccess: creates RealDatabaseAccess internally
  → else: holds null

proxyDatabase.writeData()
  → if realDatabaseAccess && user.writeAccess:
      realDatabaseAccess.writeData()   // actual write
  → else: silent (no write)
\`\`\`

### Key Insight
Client always interacts through the \`DatabaseAccess\` interface and never directly instantiates \`RealDatabaseAccess\`. The proxy adds access control without modifying the real subject. The double check (construction + call-time) handles permission changes between creation and invocation.`,
  },

];
